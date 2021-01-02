// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import Messages from './messages.js';

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json())

// db config
<<<<<<< HEAD
const connection_url = 'mongodb+srv://admin:h5xHGvUxAcBqsLwx@cluster0.0s8su.mongodb.net/whatsapp_db?retryWrites=true&w=majority'
// TODO replace mongo URI with defaukt placeholders
=======
const connection_url = 'mongodb+srv://admin:<password>@cluster0.0s8su.mongodb.net/<db_name>?retryWrites=true&w=majority'
>>>>>>> 793a44fa49d0836d60570817dc5bdf73350476c2

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// ????

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
