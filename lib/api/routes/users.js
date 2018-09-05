//  Required packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Load configs
const keys = require('../configs/keys')

// Load user model
const User = require('../models/User')

// User API health check
router.get('/test', async(req, res, next) => {
    const docs = await { msg: 'User API online'}
    res.status(200).send(docs)
})

module.exports = router