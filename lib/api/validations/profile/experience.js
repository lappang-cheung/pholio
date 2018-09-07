// Required packages
const Validator = require('validator')

// Custom module
const isEmpty = require('../is-Empty')

// Validating the experience
module.exports = validateExperienceInput = (data) => {
    
    // Error variable
    let errors = {}

    // Check if isEmpty
    data.title = !isEmpty(data.title) ? data.title : ''
    data.company = !isEmpty(data.company) ? data.company : ''
    data.from = !isEmpty(data.from) ? data.from : ''

    // Validating title
    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title field is required'
    }

    // Validating company
    if(Validator.isEmpty(data.company)){
        errors.company = 'Company field is required'
    }

    // Validating from
    if(Validator.isEmpty(data.from)){
        errors.from = 'From field is required'
    }

    // Return the errors
    return{
        errors,
        isValid: isEmpty(errors)
    }
}