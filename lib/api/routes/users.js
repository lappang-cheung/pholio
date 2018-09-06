/*
 * Author(s):
 * Leo Cheung
 */ 

//  Required packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

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
    //  Destructuing req object
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
                .then(user => res.status(200).json(user))
                .catch(err => console.log('Cannot save user'))
        }
    }catch(e){
        next(e)
    }
})

/* 
 + User API - Login
 * DESC:    Login for the user object
 * PATH:    /users/login
 * ACCESS:  Public
 */
router.post('/login', async(req, res, next) => {

    // Destructing req object
    const{ email, password } = req.body

    try{
        const user = await User.findOne({ email })
        if(user){
            // Check if password match
            if (helpers.hash(password) == user.password){

                // Payload
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: user.avatar
                }

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    }
                )
                // Return the payload
                res.status(200).json({ email: 'Login in successful'})
            }else{
                // Password incorrect
                res.status(404).json({ email: 'Password incorrect'})
            }
        }else{
            res.status(400).json({ email: 'User not found'})
        }
    }catch(e){
        next(e)
    }
})

module.exports = router