const crypto = require('crypto')
const keys = require('../configs/keys')

var helpers = {}

helpers.hash = str => {
    if (typeof str === "string" && str.length > 0) {
        var hash = crypto
        .createHmac("sha256", keys.secretOrKey)
        .update(str)
        .digest("hex");
        return hash;
    } else {
        return false;
    }
}

module.exports = helpers