/*
 * Author(s):
 * Leo Cheung
 */

// Required packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// Custom packages & classes
const keys = require('./api/configs/keys')

// App variables
const PORT = process.env.PORT || 5000
const app = express();

// Custom routes variables
const users = require("./api/routes/users")
const profile = require("./api/routes/profile");

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Custom routes
app.use('/users', users)
app.use("/profile", profile);

// Testing route
app.get('/healthcheck', async (req, res, next) => {
    const docs = await {message: 'API server online'}
    res.status(200).send(docs)
})

// Passport middleware & configs
app.use(passport.initialize())
require('./api/configs/passport')(passport)

// Connecting to DB and setting port
app.listen(PORT, async() => {
    await mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    console.log(`Listening on port ${PORT}`)
})