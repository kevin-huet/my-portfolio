require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.APP_PORT
const contactRouter = require('./routes/contact.router.js')
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3 // limit each IP to 3 requests per windowMs
})

app.use(bodyParser.json())

app.use(cors({
    origin: process.env.CORS
}))

app.use('/contact', limiter)

app.use('/contact', contactRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
