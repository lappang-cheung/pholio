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

// Load validation modules
const validateProfileInput = require('../validations/profile/profile')
const validateExperienceInput = require('../validations/profile/experience')

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

router.get('/', passport.authenticate('jwt', { session: false }), async(req, res, next) => {

    // Error variables
    const errors = {}

    try{
        // Profile variable
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['firstName', 'lastName', 'avatar']);
        // Check for profile
        if(profile){
            // return profile object
            res.json(profile)
        }else{
            // return the profile errors
            errors.noprofile = 'There is no profile for this user'
            res.status(404).json(errors)
        }
    }catch(e){
        next(e)
    }
})

/* 
 + Profile API - GET profile by handle
 * DESC:    Get the profile handle
 * PATH:    /profile/handle/:handle
 * ACCESS:  Public
 */

router.get('/handle/:handle', async (req, res, next) => {

    // Error variables
    const errors = {}

    try{
        // Find user by handle
        const handle = await Profile.findOne({ handle: req.params.handle }).populate('user', ['firstName', 'lastName', 'avatar'])

        // Handle not found
        if(!handle){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        // Return handle object
        res.json(handle)
    }catch(e){ 
        next(e) 
    }
})

/* 
 + Profile API - GET all profile
 * DESC:    Get all profile
 * PATH:    /profile/all
 * ACCESS:  Public
 */

router.get('/all', async(req, res, next) => {

    // Error variables
    const errors = {}
    try{
        // Find profiles of all users
        const profiles = await Profile.find().populate('user', ['firstName', 'lastName', 'avatar'])

        // No profiles exist
        if(!profiles){
            errors.noprofile = 'There are no profiles'
            return res.status(400).json(errors)
        }
        // Return profiles
        res.json(profiles)

    }catch(e){
        next(e)
    }
})

 /* 
 + Profile API - GET profile by user_id
 * DESC:    Get the user id
 * PATH:    /profile/user/:user_id
 * ACCESS:  Public
 */

router.get('/user/:user_id', async (req, res, next) => {
  
    // Error variables
    const errors = {};

    try{
        // Find user by user_id
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['firstName', 'lastName', 'avatar'])

        // Profile not found
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        // Return profile
        res.json(profile)
    }catch(e){
        next(e)
    }
})

/* 
 + Profile API - POST
 * DESC:    Create & Update the profile object
 * PATH:    /profile/
 * ACCESS:  Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    // Destructuring req object
    const { errors, isValid } = validateProfileInput(req.body)
    // Return errors
    if(!isValid){
        return res.status(400).json(errors)
    }

    // Get fields
    const profileFields = {}
    
    // Individual validations
    profileFields.user = req.user.id
    
    if(req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company 
    if (req.body.website) profileFields.website = req.body.website 
    if (req.body.location) profileFields.location = req.body.location 
    if (req.body.bio) profileFields.bio = req.body.bio 
    if (req.body.status) profileFields.status = req.body.status 

    // Skills - Split into array
    if (typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {}
    if (req.body.github) profileFields.social.github = req.body.github
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        if(profile){
            // Update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true}
            ).then(profile => res.json(profile))
        }else{
            // Create

            // Check if handle exist
            Profile.findOne({ handle: profileFields.handle})
            .then(profile => {
                errors.handle = 'That handle already exists'
                res.status(400).send(errors)
            })

            // Save profile
            new Profile(profileFields).save()
            .then(profile => res.json(profile))
        }
    } catch (e) {
        next(e)
    }
})

<<<<<<< HEAD
/* 
 + Profile API - POST
=======
/*
 * Profile API - POST
>>>>>>> master
 * DESC:    Add education & experience
 * PATH:    /profile/experience
 * ACCESS:  Private
 */
router.post('/experience', passport.authenticate('jwt', {session: false}), async(req ,res, next) => {

<<<<<<< HEAD
    // Destructuring
    const { title, company, location, from, to, current, description } = req.body

    try{
=======
    // Destructuring req object
    const { errors, isValid } = validateProfileInput(req.body)
    // Return errors
    if(!isValid){
        return res.status(400).json(errors)
    }

   try{
       // Destructuring req object
        const { title, company, location, from, to, current, description } = req.body
>>>>>>> master
        const profile = await Profile.findOne({ user: req.user.id })

        if(profile){
            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            }

            // Add to experience array
            profile.experience.unshift(newExp)
            // Save the experience
            profile.save().then(profile => res.json(profile))
        }

    }catch(e){
        next(e)
    }
})

// Export the module
module.exports = router