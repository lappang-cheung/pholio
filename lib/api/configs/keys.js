/*
 * Author(s):
 * Leo Cheung
 */

// Check for environments
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod')
} else {
    module.exports = require('./keys_stg')
}