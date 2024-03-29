const res = require('express/lib/response');
const passport = require('passport');
const User = require('../models/userModel');

const loginPage = (req, res) => {
    res.render('pages/login', { user: req.user });
}

const signupPage = (req, res) => {
    res.render('pages/signup', { user: req.user });
}

const loginUser = passport.authenticate('local', {
    successRedirect: '/adopt',
    failureRedirect: '/login',
    failureFlash: false
});

const signupUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        await User.register(user, password);
        passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
    } catch(err){
        console.log(err);
        res.redirect('/signup');
    }
} 

const logoutUser = (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
      });
};

module.exports = {
    loginPage,
    loginUser,
    signupPage,
    signupUser,
    logoutUser
  };