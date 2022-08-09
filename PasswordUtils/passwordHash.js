const crypto = require('crypto');

const passwordHash = (password, salt) => {
    const hash = crypto.pbkdf2Sync(
        password, 
        salt, 
        10000, 
        64, 
        'sha512'
    ).toString('hex');

    return hash
};
module.exports.passwordHash = passwordHash;