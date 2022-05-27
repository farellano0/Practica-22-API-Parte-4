const express = require('express'); //Inyección de la dependencia
const { route } = require('express/lib/application');
const router = express.Router(); //Instanciación del "router" al que asociaremos todas las rutas
const mongoose = require('mongoose') //"Inyección de la dependencia de mongoose"
let Person = require('../models/person') //Inyectamos la dependencia del modelo "person"

router.get('/persons', function (req, res, next) {
    Person.find(function (err, persons) {
        if(err) return next(err);
        //res.json(persons)
        res.render('personsIndex', {persons})
    });
}); //Ruta /persons por el metodo GET, se verifica si existe, en cambio da error si no existe.

router.get('/person', function (req, res) {
    res.render('person');
}) //Ruta /person donde se vizualiza el formulario

router.post('/addPerson', function(req, res) { //Método donde se crea una nueva personas con su
    const myPerson = new Person({             // información y se guarda en la BD.
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss }); //crea la entidad
        myPerson.save(); // guarda en bd
        res.redirect('/persons')
});

/* DELETE PERSONE */
router.get('/deletePerson/:id', function (req, res, next) {
    Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if(err) return next(err);
        res.redirect('/persons');
    });
});

/* FIND BY ID PERSON */
router.get('/findById/:id', function(req, res, next){
    Person.findById(req.params.id, function(err, person){
        if (err) return (err);
        res.render('personUpdate', {person});
    });
});

/* UPDATE PERSON */
router.post('/updatePerson', function(req, res, next){
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }, function(err, post){
        if (err) return next(err)
        res.redirect('/persons');
    });
});

module.exports = router; //Exportación del ruteador
