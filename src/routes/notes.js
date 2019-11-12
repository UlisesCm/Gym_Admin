const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require ('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note',isAuthenticated, async (req, res) => {
    const { nombre, edad, estatura, telefono, telefono_emergencia, dia_pago } = req.body;
    const errors = [];
    if (!nombre){
        errors.push({
            text: 'Porfavor agrege un Nombre'
        });
    }

    if (!edad){
        errors.push({
            text: 'Porfavor agrege la Edad'
        })
    }

    if (!estatura){
        errors.push({
            text: 'Porfavor agrege una Estatura'
        })
    }

    if (!telefono){
        errors.push({
            text: 'Porfavor agrege un telefono'
        })
    }

    if (!telefono_emergencia){
        errors.push({
            text: 'Porfavor agrege el telefono de emergencia'
        })
    }

    if (!dia_pago){
        errors.push({
            text: 'Porfavor agrege el Dia de Pago'
        })
    }

    if (errors.length > 0) {
        res.render('notes/new-note',{
            errors,
            nombre,
            edad,
            estatura,
            telefono,
            telefono_emergencia,
            dia_pago
        });
    } else {

        const newNote = new Note ({ nombre, edad, estatura, telefono, telefono_emergencia, dia_pago });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Cliente Creado Correctamente');
        res.redirect('/notes');
    }  
});

router.get('/notes', isAuthenticated, async (req,res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/view/:id', isAuthenticated, async (req,res) =>{
    const note = await Note.findById(req.params.id);
    res.render('notes/view-note',{note});
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note',{note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const { nombre, edad, estatura, telefono, telefono_emergencia, dia_pago }= req.body;
    await Note.findByIdAndUpdate(req.params.id, { nombre, edad, estatura, telefono, telefono_emergencia, dia_pago});
    req.flash('success_msg', 'Cliente Modificado Correctamente');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Cliente Eliminada Correctamente');
    res.redirect('/notes');
});

module.exports = router;