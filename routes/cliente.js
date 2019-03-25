var express = require("express");

var app = express();
var Cliente = require("../models/cliente");

//=======================================
//      Obtener todos los  clientes
//=======================================

app.get('/', (req, res) => {

    Cliente.find({}, (err, clientes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Clientes',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        });
    });


});

//=======================================
//      Obtener clientes por usuario
//=======================================

app.get('/:usuario/:equipo', (req, res) => {

    var usuario = req.params.usuario;
    var equipo = req.params.equipo;

    Cliente.find({ 'usuario_id': usuario })
        .populate({
            path: 'usuario_id',
            match: { 'equipo_id': equipo }
        })
        .exec((err, clientes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error Cargando Clientes',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                clientes: clientes
            });
        });


});

//============================================
//      Obtener clientes por equipo y usuario
//============================================

// app.get('/:equipo/:usuario', (req, res) => {

//     var equipo = req.params.equipo;
//     var usuario = req.params.usuario;

//     Cliente.find({}, 'usuario_id email').populate({
//             path: 'usuario_id',
//             match: { '_id': usuario, 'equipo_id': equipo }
//         })
//         .exec((err, clientes) => {
//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: 'Error Cargando clientes',
//                     errors: err
//                 });
//             }
//             clientes.forEach(cliente => {
//                 if (cliente.usuario_id === null) {
//                     clientes.splice(clientes.indexOf(cliente), 1);
//                 }
//             });
//             res.status(200).json({
//                 ok: true,
//                 clientes: clientes
//             });
//         });

// });

//=======================================
//      Guardar Clientes nuevos
//=======================================

app.post('/', (req, res) => {

    var body = req.body;
    var cliente = new Cliente({
        usuario_id: body.usuario_id,
        email: body.email
    });

    cliente.save((err, clienteGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            cliente: clienteGuardado
        });
    });
});

module.exports = app;