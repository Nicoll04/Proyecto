//Nicoll Yuliana Acosta Delgado

var Usuario = require('../../models/usuario');

exports.usuarios_list = function(req, res) {
    Usuario.find({})
        .then(function(usuarios) {
            res.status(200).json({
                usuarios: usuarios
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send(err);
        });
};

exports.usuarios_create = function(req, res) {
    var usuario = new Usuario({ nombre: req.body.nombre });

    usuario.save()
        .then(function(usuarioGuardado) {
            res.status(200).json(usuarioGuardado);
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send(err);
        });
};

exports.usuarios_reservar = function(req, res) {
    Usuario.findById(req.body.id)
        .then(function(usuario) {
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            console.log(usuario);
            return usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta);
        })
        .then(function() {
            console.log('Reserva realizada con éxito');
            res.status(200).send();
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send(err);
        });
};
