const User = require('./UserSchema');
const passwordHash = require('../../PasswordUtils/passwordHash');

const saveUser = async (username, password, hash, salt) => {
    const newUser = await new User({
        username: username,
        password: password,
        hash: hash,
        salt: salt
    });
    
    newUser.save().then(user =>
        console.log(username + " is saved successfully", user)
    );
}

module.exports.saveUser = saveUser;