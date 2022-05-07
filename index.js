const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const ObjectId = require('mongodb').ObjectId

app.use(cors())
app.use(express.json())


//amarCycle
//jBZcFdEsJnsJuW0m



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6rxzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db("amarCycle").collection("inventory");

        //get:Existing get user
        app.get('/inventory', async (req, res) => {
            const query = {}
            const cursor = inventoryCollection.find(query)
            const inventory = await cursor.toArray()
            res.send(inventory)
        })
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await inventoryCollection.findOne(query)
            res.send(result)
        })

        //POST inventory: add a new user
        app.post('/inventory', async (req, res) => {
            const newInventory = req.body
            console.log("new adding", newInventory)
            const result = await inventoryCollection.insertOne(newInventory)
            res.send(result)

        })

        //update user
        app.put(`/inventory/:id`, async (req, res) => {
            const id = req.params.id
            const updateInventory = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateInventory.name,
                    email: updateInventory.email,

                },
            };
            const result = await inventoryCollection.updateOne(filter, updateDoc, options)
            res.send(result)

        })

        //delete inventory
        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await inventoryCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)




app.get("/", (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log("Amar Cycle server is running", port)
})