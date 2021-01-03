// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import Messages from './messages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: "1131488",
  key: "32a73c3067223bcb5c05",
  secret: "13c331408c3c6fb27071",
  cluster: "us2",
  useTLS: true
});

// middleware
app.use(express.json())
app.use(cors())

// db config
const connection_url = 'mongodb+srv://admin:<password>@cluster0.0s8su.mongodb.net/<db_name>?retryWrites=true&w=majority'
// TODO replace mongo URI with default placeholders

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// pusher
const db = mongoose.connection

db.once('open', ()=> {
    console.log('DB is connected')

    const msgCollection = db.collection('whatsappmessages')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.receieved
                }
            )
        } else {
            console.log('trigger error')
        }
    })
})

// api routes
app.get('/', (req, res) => res.status(200).send('Hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// listener
app.listen(port,() => console.log(`Listening on localhost:${port}`))
