/*
 * Author(s):
 * Leo Cheung
 */

//  Required packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load configs
const keys = require('../configs/keys')

// Load user model
const Profile = require('../models/Profile')
const User = require('../models/User')

// User API health check
router.get('/test', async (req, res, next) => {
    const docs = await { msg: 'Profile API online' }
    res.status(200).send(docs)
})

/* 
 + Profile API - GET
 * DESC:    Get the profile object
 * PATH:    /profile/
 * ACCESS:  Private
 */

router.get('/', passport.authenticate('jwt', { session: false }), async(req, res, next) =>{
    // Error variables
    const errors = {}

    try{
        // Profile variable
        const profile = await Profile.findOne({ user: req.user.id });
        // Check for profile
        if(profile){
            // return profile object
            res.json(profile)
        }else{
            // return the profile errors
            errors.profile = 'There is no profile for this user'
            res.status(404).json(errors)
        }
    }catch(e){
        next(e)
    }
})

// Export the module
module.exports = router