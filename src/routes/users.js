const express = require('express');
const router = express.Router();
const User = require('../models/User');
const password = require ('passport');

router.get('/users/signin', (req,res) => {
    res.render('users/signin');
});

router.post('/users/signin', password.authenticate('local', {
    successRedirect: '/notes/',
    failureRedirect: '/users/signin',
    failureFlash: true
}))


//alta
router.get('/users/signup', (req,res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) =>{
    const{ name, email, password, confirm_password} = req.body;
    const errors = [];
    const emailUser = await User.findOne({email: email});
    
    
    // validacion 
    if(name.length <= 0){
        errors.push({text: 'Ingrese un Nombre por Favor'});
    }
    if(email.length <= 0){
        errors.push({text: 'Ingrese un Correo por Favor'});
    }
    if(password != confirm_password){
        errors.push ({text: 'La contraseña no Coincide'});
    }
    if(password.length < 4 ) {
        errors.push ({ text: 'La contraseña debe de tener mas de 4 caracteres'});
    }
    if(emailUser){
        errors.push ({text: 'El correo ya existe'})
    }

    if(errors.length > 0){
        res.render ('users/signup', {errors, name, email, password, confirm_password});
    } else {       
        const newUser = new User ({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','Registrado Correctamente');
        res.redirect('/users/signin');
    }

});

router.get('/users/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
});

module.exports = router;