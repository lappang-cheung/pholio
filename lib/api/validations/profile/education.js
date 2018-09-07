// Required packages
const Validator = require('validator')

// Custom module
const isEmpty = require('../is-Empty')

// Validating the experience
module.exports = validateEducationInput = (data) => {
    
    // Error variable
    let errors = {}

    // Check if isEmpty
    data.school = !isEmpty(data.school) ? data.school : ''
    data.degree = !isEmpty(data.degree) ? data.degree : ''
    data.from = !isEmpty(data.from) ? data.from : ''
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''

    // Validating school
    if(Validator.isEmpty(data.school)){
        errors.school = 'School field is required'
    }

    // Validating degree
    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Degree field is required'
    }

    // Validating fieldofstudy
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = 'Field of study is required'
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