const userModel = require('../models/user');
const adminModel = require('../models/admin')
const Product = require('../models/product');
const bcrypt = require('bcrypt');

exports.getSignUp = (req, res) => {
    res.render('signUp',{pageTitle: "Sign Up"})
};

exports.postSignUp = (req, res) => {
    const { username, email, password, role} = req.body;
    const saltRounds = 10;
    let newUser;

    bcrypt.hash(password, saltRounds, (err, hashedPass) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        } else {
            if(role == 'user'){
                newUser = new userModel({
                    name: username,
                    email: email,
                    password: hashedPass
                });
            } else {
                newUser = new adminModel({
                    name: username,
                    email: email,
                    password: hashedPass
                });
            }

            newUser.save()
            .then(() => {
                console.log('User created successfully');                
                res.status(201).send('User created successfully');
            })
            .catch((saveErr) => {
                console.log('Error saving user:', saveErr.message);
                res.status(500).send('Error saving user');
            });
        }
    });
};


exports.getLogin = (req, res) => {
    res.render('login',{pageTitle: "Login"})
};

exports.postLogin = (req, res) => {
};

exports.logOut = (req, res) => {
};
