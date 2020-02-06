const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// @type GET
// @route /api/user/
// @desc just to test
// @access Public
router.get('/',(req,res) => {
    res.send('Hello');
})

// @type Post
// @route /api/user/register
// @desc to register user
// @access Public

router.post('/register',(req,res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                res.status(400).json({err: 'User already exists'});
            } else {
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                               .then(user => res.status(200).json(user))
                               .catch(e => res.status(404).json(e)); 
                    })
                })
            }
        })
        .catch(e => res.status(404).json(e))
})


// @type Post
// @route /api/user/login
// @desc to login user
// @access Public
router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then( user => {
            if(user){
                bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch) {

                            const payload = {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }

                            jwt.sign(payload,'secret', {expiresIn: 3600},(err,token) => {
                                if(err) throw err;
                                res.status(200).json({
                                    success: true,
                                    token: 'Bearer '+ token
                                })
                            })

                        } else {
                            res.status(400).json({msg: 'Password is wrong'})
                        }
                    })
                  
            } else {
                res.status(400).json({msg: 'User with this email id does not exist'})
            }
        })
        .catch(e => res.status(404).json(e));
})


module.exports = router;