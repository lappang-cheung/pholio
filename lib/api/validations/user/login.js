// Required packages
const Validator = require('validator')

// Custom module
const isEmpty = require('../is-Empty')

// Validating the login
module.exports = validateLoginInput = (data) => {
    
    // Error variable
    let errors = {}

    // Check if isEmpty
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Validating email
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid'
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    // Validating password
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required"
    }

    // Return the errors
    return{
        errors,
        isValid: isEmpty(errors)
    }
}