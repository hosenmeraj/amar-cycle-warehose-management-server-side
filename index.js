const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


//amarCycle
//5uI9D9d9QjHq7Vo2



const uri = "mongodb+srv://amarCycle:5uI9D9d9QjHq7Vo2@cluster0.6rxzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db("amarCycle").collection("inventory");

        //get:
        app.get('/inventory', async (req, res) => {
            const query = {}
            const cursor = inventoryCollection.find(query)
            const inventory = await cursor.toArray()
            res.send(inventory)
        })

        //POST inventory: add a new user
        app.post('/inventory', async (req, res) => {
            const newInventory = req.body
            console.log("new adding", newInventory)
            const result = await inventoryCollection.insertOne(newInventory)
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