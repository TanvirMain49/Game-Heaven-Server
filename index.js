const express = require('express');
const cors = require('cors');
const port =  process.env.PORT || 5000;
const app = express();

// middle ware 
app.use(cors());
app.use(express.json());



// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       // await client.connect();
  
//       // coffee card section
//       const db = client.db('coffeeDB');
//       const coffeeCollection = db.collection('coffee');
  
//       // userInfo
//       const userCollection = client.db('coffeeDB').collection('users');
  
  
//       // get all the data from mongodb and send to client site
//       app.get('/coffee', async (req, res) => {
//         const cursor = coffeeCollection.find();
//         const result = await cursor.toArray();
//         res.send(result);
//       })
  
  
//       //get a specific data and send to client site
//       app.get('/coffee/:id', async (req, res) => {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) }
//         const result = await coffeeCollection.findOne(query);
//         res.send(result);
//       })
  
  
//       // update a specific data 
//       app.put('/coffee/:id', async (req, res) => {
//         const id = req.params.id;
//         const filter = { _id: new ObjectId(id) };
//         const options = { upsert: true };
//         const coffee = req.body;
//         const updatedCoffee = {
//           $set: {
//             name: coffee.name,
//             chef: coffee.chef,
//             supplier: coffee.supplier,
//             taste: coffee.taste,
//             category: coffee.category,
//             details: coffee.details,
//             photoURL: coffee.photoURL
//           }
//         }
  
//         const result = await coffeeCollection.updateOne(filter, updatedCoffee, options);
//         res.send(result);
  
  
//       })
  
//       // get data from client site and send data to mongodb
//       app.post('/coffee', async (req, res) => {
//         const newCoffey = req.body;
//         const result = await coffeeCollection.insertOne(newCoffey);
//         res.send(result);
//       })
  
//       //delete a specific data
//       app.delete('/coffee/:id', async (req, res) => {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await coffeeCollection.deleteOne(query);
//         console.log(result);
//         res.send(result);
//       })
  
  
//       // -------- Users Related api -------------
  
  
//       app.get('/users/:id', async(req, res)=>{
//           const id = req.params.id;
//           const query = {_id: new ObjectId(id)};
//           const result = await userCollection.findOne(query);
//           res.send(result);
//       })
  
//       app.get('/users', async(req, res)=>{
//         const cursor = userCollection.find();
//         const result = await cursor.toArray();
//         res.send(result);
//       })
  
  
//       //get data from client side
//       app.post('/users', async(req, res)=>{
//         const newUser = req.body;
//         const result = await userCollection.insertOne(newUser);
//         res.send(result);
//       })
  
  
//       app.patch('/users/:email', async(req, res)=>{
//         const email = req.params.email;
//         const filter = {email};
//         const updatedDoc = {
//           $set:{
//             lastLogIn: req.body?.lastLogIn
//           }
//         }
  
//         const result = await userCollection.updateOne(filter, updatedDoc);
//         res.send(result);
//       })
  
//       // delete a data from db
//       app.delete('/users/:id', async(req, res)=>{
//         const id = req.params.id;
//         const query = {_id: new ObjectId(id)};
//         console.log(query)
//         const result = await userCollection.deleteOne(query);
//         res.send(result);
//       })
  
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       // await client.close();
//     }
//   }
// run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Server is running....');
})

app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}`);
})