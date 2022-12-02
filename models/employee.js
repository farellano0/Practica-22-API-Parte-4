const mongoose = require('mongoose');
let EmployeeSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    telefono: Number,
    correo: String,
    tipoSangre: String,
    nss: Number
});
module.exports = mongoose.model('Employee', EmployeeSchema);