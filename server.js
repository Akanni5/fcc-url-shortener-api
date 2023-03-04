require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_CONNECT
const app = express()
const appRouter = require('./routes/api')

app.use(cors({ optionSuccessStatus: 200 }))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
// set static files url
app.use('/public', express.static(path.join(__dirname, "public")))
app.use('/api', appRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"))
})



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000)