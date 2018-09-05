//  Required packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Load configs
const keys = require('../configs/keys')

// Load user model
const Profile = require('../models/Profile')

// User API health check
router.get('/test', async (req, res, next) => {
    const docs = await { msg: 'Profile API online' }
    res.status(200).send(docs)
})

module.exports = router