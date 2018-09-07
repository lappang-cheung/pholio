// Required packages
const Validator = require('validator')

// Custom modules
const isEmpty = require('../is-Empty')

// Validating the profile
module.exports = validateProfileInput = (data) => {

    // Errors declaration
    let errors = {};

    // Check if isEmpty
    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''

    // Validating handle
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 40 characters'
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required'
    }

    // Validating status
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required'
    }

    // Validating skills
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required'
    }

    // Validating website
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
        errors.website = 'Not a valid URL'
        }
    }

    // Validating github
    if (!isEmpty(data.github)) {
        if (!Validator.isURL(data.github)) {
        errors.github = 'Not a valid URL'
        }
    }

    // Validating twitter
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
        errors.twitter = 'Not a valid URL'
        }
    }

    // Validating facebook
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
        errors.facebook = 'Not a valid URL'
        }
    }

    // Validating linkedin
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
        errors.linkedin = 'Not a valid URL'
        }
    }

    // Validating instagram
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
        errors.instagram = 'Not a valid URL'
        }
    }

    // Return errors
    return {
        errors,
        isValid: isEmpty(errors)
    }
};