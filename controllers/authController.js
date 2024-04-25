const userModel = require('../models/user');
const adminModel = require('../models/admin')
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtUtils')

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
                    password: hashedPass,
                    cart: { items: [] } 
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
    const { email, password } = req.body;
    const User = req.body.role === 'user' ? userModel : adminModel;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({ error: 'Invalid password' });
                }
                
                const payload = { id: user._id, email: user.email, role: req.body.role };
                const token = jwt.generateToken(payload);
                res.json({ token });
            });
        })
        .catch((err) => {
            console.error('Error logging in:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};


exports.logOut = (req, res) => {

};
