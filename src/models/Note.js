const mongoose = require ('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema ({
    nombre:{type: String, required: true},
    edad:{type: Number, required: true},
    estatura:{type: Number, required: true},
    telefono:{type: Number, required: true},
    telefono_emergencia:{type: Number, required: true},
    dia_pago:{type: Number, required:true},
    user: { type: String}
    /* title: { type : String, required: true},
    description: { type : String, required: true},
    date: { type: Date, default: Date.now},
    user: { type: String} */
});

module.exports = mongoose.model('Note',NoteSchema);