// Required packages
const Validator = require('validator')

// Custom modules
const isEmpty = require('../is-Empty')

// Validating the register
module.exports = validateRegisterInput = (data) =>{
    
    // Errors declaration
    let errors = {}

    // Check if isEmpty
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.avatar = !isEmpty(data.avatar) ? data.avatar : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    // Validating first name
    if(!Validator.isLength(data.firstName, {min: 2, max: 30})){
        errors.firstName = 'First name must be between 2 and 30 characters'
    }
    if(Validator.isEmpty(data.firstName)){
        errors.firstName = 'First name field is required'
    }

    // Validating last name
    if(!Validator.isLength(data.lastName, {min: 2, max: 30})){
        errors.lastName = 'Last name must be between 2 and 30 characters'
    }
    if(Validator.isEmpty(data.lastName)){
        errors.lastName = 'Last name field is required'
    }

    // Validating email
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid'
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    // Validating password
    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be between 6 and 30 characters'
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    // Validating confirm password
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords does not match'
    }
    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password field is required'
    }

    // Return errors
    return{
        errors,
        isValid: isEmpty(errors)
    }
}