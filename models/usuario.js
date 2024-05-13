//Nicoll Yuliana Acosta Delgadp

const mongoose = require('mongoose');
const Reserva = require('./reserva');
const Bicicleta = require('./bicicleta');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String
});

usuarioSchema.methods.reservar = function(biciId, desde, hasta) {
    const reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    console.log(reserva);
    return reserva.save(); // Devolvemos la promesa para manejarla externamente
};

module.exports = mongoose.model('Usuario', usuarioSchema);
