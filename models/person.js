const mongoose = require('mongoose');
let PersonSchema = new mongoose.Schema({
    nombre: String,
    habitacion: Number,
    correo: String,
});
module.exports = mongoose.model('Persons', PersonSchema);

