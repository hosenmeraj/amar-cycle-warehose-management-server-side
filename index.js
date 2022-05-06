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
        const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
            quantity: "1"
        }
        const result = await inventoryCollection.insertOne(doc)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
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