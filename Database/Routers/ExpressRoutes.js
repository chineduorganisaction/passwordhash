require('dotenv').config({path: '../../../.env', debug: true});
const express = require('express');
const crypto = require('crypto');
const user = require('../config/User').saveUser;
const findUser = require('../config/User').findUser;
const passwordHash = require('../../PasswordUtils/passwordHash').passwordHash;
const genKeyPair = require('../../PasswordUtils/keyPair');
const app = express();
const User = require('../config/UserSchema');
const port = process.env.PORT;

/*  ------ MIDDLEWARES ----- */
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*  ------ GET ROUTES ----- */
app.get('/', (req, res, done) => {
    res.send("<p>Greetings</p>")
})

app.get('/login', (req, res, done) => {
    res.send(
        `<form action='/login' method='POST'>\
            <input type="text" name="uname"/>\
            <input type="password" name="pword"/>\
            <input type="submit" value="login"/>\
        </form>`
    );
})

app.get('/register', (req, res, done) => {
    
    res.send(
        `<form action='/register' method='POST'>\
            <input type="text" name="uname"/>\
            <input type="password" name="pword"/>\
            <input type="submit" value="register"/>\
        </form>`
    )
})

/*  ------ POST ROUTES ----- */
app.post('/login', (req, res, done) => {
    const uname = req.body.uname;
    const pword = req.body.pword;
    User.findOne(
        {username: uname},
        (err, person) => {
            const newHash = passwordHash(pword, person.salt);
            const validPword = newHash === person.hash;
            if(person) {
                console.log(
                    person.username, 
                    person.salt, 
                    person.hash, 
                    newHash,
                    validPword,
                    pword
                );
                return res.redirect('/');
                
            }else{
                console.log(err);
                return res.redirect('/login');
            }
        }
    )
})

app.post('/register', (req, res, done) => {

    user(
        uname = req.body.uname, 
        pword = req.body.pword,
        salt = crypto.randomBytes(32).toString('hex'),
        hash = passwordHash(pword, salt)
    )
    genKeyPair();
    res.redirect('/login');
})

app.listen(port, console.log('Server Started at '+port));