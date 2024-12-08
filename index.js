require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// Middleware to enable CORS and parse JSON data in requests
app.use(cors());
app.use(express.json());

// MongoDB connection URI using environment variables for credentials
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kriop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Async function to run the MongoDB operations
async function run() {
  try {
    // Connect to MongoDB server
    // await client.connect();

    // Define collections in the MongoDB database
    const reviewsCollection = client.db("GameHeavenDB").collection("reviews");
    const watchListCollection = client.db("GameHeavenDB").collection("watchList");


    // Get all reviews from the 'reviews' collection
    app.get('/reviews', async (req, res) => {
      const query = reviewsCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    app.get('/reviews/rating', async (req, res) => {
      const query = reviewsCollection.find().sort({rating: -1});
      const result = await query.toArray();
      res.send(result);
    });

    // Get a specific review by ID from the 'reviews' collection
    app.get('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewsCollection.findOne(query);
      res.send(result);
    });

    // Get reviews based on user email from the 'reviews' collection
    app.get('/myReviews/:email', async (req, res) => {
      const userEmail = req.params.email;
      const query = { email: userEmail };
      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
    });

    // Add a new review to the 'reviews' collection
    app.post('/reviews', async (req, res) => {
      const newReview = req.body;
      const result = await reviewsCollection.insertOne(newReview);
      res.send(result);
    });

    // update a review card
    app.put('/updateReview/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const review = req.body;
      console.log(review);
      const updatedReview = {
        $set: {
          userName: review.userName,
          email: review.email,
          title: review.title,
          image: review.image,
          rating: review.rating,
          publishingYear: review.publishingYear,
          genre: review.genre,
          description: review.description,
        }
      }
      const result = await reviewsCollection.updateOne(filter, updatedReview, options);
      res.send(result);
    })

    //delete a review from review data base
    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(query);
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    })


    // ----------------------------------Watch List------------------------------->

    // Get all watchList items from the 'watchList' collection
    app.get('/watchLists/:email', async (req, res) => {
      const email = req.params.email;
      try{
        const userWatchList = await watchListCollection.findOne({email})
        res.send(userWatchList);
      }
      catch(error){
        console.log(error);
        res.status(500).send({error:"Failed to fetch watchList"})
      }
    });

    // Add a new watchList item to the 'watchList' collection
    app.post('/watchLists', async (req, res) => {
      const newList = req.body;
      const { email } = newList;
      const result = await watchListCollection.updateOne(
        { email },
        { $addToSet: { watchList: newList } },
        { upsert: true }
      );
      res.send(result);
    });

    // Send a ping to confirm MongoDB connection success
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensure that the client will close when the operation finishes or encounters an error
    // await client.close(); // Optionally close the connection
  }
}

// Run the async function to connect to MongoDB and handle requests
run().catch(console.dir); // Catch any errors during connection or operations

// Root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running....');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
