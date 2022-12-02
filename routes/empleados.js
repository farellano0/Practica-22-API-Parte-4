const express = require('express'); //Inyección de la dependencia
const { route } = require('express/lib/application');
const router = express.Router(); //Instanciación del "router" al que asociaremos todas las rutas
const mongoose = require('mongoose') //"Inyección de la dependencia de mongoose"
let Employee = require('../models/employee') //Inyectamos la dependencia del modelo "person"

router.get('/employees', function (req, res, next) {
    Employee.find(function (err, employees) {
        if(err) return next(err);
        //res.json(persons)
        res.render('employeesIndex', {employees})
    });
}); //Ruta /persons por el metodo GET, se verifica si existe, en cambio da error si no existe.

router.get('/employee', function (req, res) {
    res.render('employee');
}) //Ruta /person donde se vizualiza el formulario

router.post('/addEmployee', function(req, res) { //Método donde se crea una nueva personas con su
    const myEmployee = new Employee({             // información y se guarda en la BD.
        nombre: req.body.nombre,
        edad: req.body.edad,
        telefono: req.body.telefono,
        correo: req.body.correo,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss }); //crea la entidad
        myPerson.save(); // guarda en bd
        res.redirect('/employees')
});

/* DELETE PERSON */
router.get('/deleteEmploy/:id', function (req, res, next) {
    Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if(err) return next(err);
        res.redirect('/employees');
    });
});

/* FIND BY ID PERSON */
router.get('/findById/:id', function(req, res, next){
    Employee.findById(req.params.id, function(err, person){
        if (err) return (err);
        res.render('employeeUpdate', {person});
    });
});

/* UPDATE PERSON */
router.post('/updateEmployee', function(req, res, next){
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        edad: req.body.edad,
        telefono: req.body.telefono,
        correo: req.body.correo,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }, function(err, post){
        if (err) return next(err)
        res.redirect('/employees');
    });
});

module.exports = router; //Exportación del ruteador