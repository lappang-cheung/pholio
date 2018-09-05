/*
 * Author(s):
 * Leo Cheung
 */ 

//  Required packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Load configs
const keys = require('../configs/keys')

// Load custom mmodules
const helpers = require('../helpers/helpers')

// Load user model
const User = require('../models/User')

// User API health check
router.get('/test', async(req, res, next) => {
    const docs = await { msg: 'User API online'}
    res.status(200).send(docs)
})

/* 
 + User API - Create
 * DESC:    Create the user object
 * PATH:    /users/register
 * ACCESS:  Public
 */
router.post('/register', async(req, res, next) => {

    const { firstName, lastName, email, avatar, password } = req.body

    try{
        const user = await User.findOne({ email })
        // Check if email already register
        if(user){
            // Return error
            res.status(400).json({ email: 'Email already exist' })
        }else{
            // Create the user object
            const newUser = new User({
                firstName,
                lastName,
                email,
                avatar,
                password: helpers.hash(password)
            })
            // Save the user
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log('Cannot save user'))
        }
    }catch(e){
        next(e)
    }
})

module.exports = router