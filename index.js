const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000
const username = formbuilder
const pass = cteptoTXaHW6zZRl
app.use(cors())
app.use(express.json())


//connect database username and password
const uri = `mongodb+srv://${username}:${pass}@cluster0.u5ucb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('formbuilder')
        const generateform = database.collection('generatevalue')
        const submitform = database.collection('submitvalue')

        //POST API for generate form data

        app.post('/generatevalue', async (req, res) => {
            const Fieldname = req.body
            console.log('hit the post api', Fieldname)
            const result = await generateform.insertOne(Fieldname)
            console.log('hit the post api')
            res.json(result)
        })


        //POST API for submit form data
        app.post('/submitvalue', async (req, res) => {
            const Formvalue = req.body
            const result = await submitform.insertOne(Formvalue)
            res.json(result)
        })
        //GET api for single submit value
        app.get('/submitvalue/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const submitvalue = await submitform.findOne(query)
            res.json(submitvalue)
        })
        //get api for submit value
        app.get('/submitvalue', async (req, res) => {
            const cursor = submitform.find({})
            const submitvalue = await cursor.toArray()
            res.send(submitvalue)
        })

        //GET ApI from generate form data
        app.get('/generatevalue', async (req, res) => {
            const cursor = generateform.find({})
            const generatevalue = await cursor.toArray()
            res.send(generatevalue)
        })

        //GET API for single data generate form
        app.get('/generatevalue/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const generatevalue = await generateform.findOne(query)
            res.json(generatevalue)
        })

    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('hello from formbuilder server')
})
app.listen(port, () => {
    console.log('listening to port ', port)
})
