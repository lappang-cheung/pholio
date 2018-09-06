// Required package
const crypto = require('crypto')

// Loading configs
const keys = require('../configs/keys')

// Helper variables
var helpers = {}

// Create a hash for passwords
helpers.hash = str => {
    // Check if its a string and valid
    if (typeof str === "string" && str.length > 0) {
        var hash = crypto
        .createHmac("sha512", keys.secretOrKey)
        .update(str)
        .digest("hex");
        return hash;
    } else {
        return false;
    }
}



// Export the module
module.exports = helpers