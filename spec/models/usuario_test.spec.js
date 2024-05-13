//Nicoll Yuliana Acosta Delgado

var mongoose = require('mongoose')
var Bicicleta = require('../../models/bicicleta')
var Usuario = require('../../models/usuario')
var Reserva = require('../../models/reserva')
const usuario = require('../../models/usuario')

describe('Testing Usuarios', function(){
    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb'
        mongoose.connect(mongoDB)
    
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'Connection error'))
        db.once('open', function() {
            console.log('we are connected to test database!')
            done();
        })
      })

      afterEach(function(done) {
        Reserva.deleteMany({})
            .then(() => {
                return Usuario.deleteMany({});
            })
            .then(() => {
                return Bicicleta.deleteMany({});
            })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.error(err);
                done.fail(err);
            });
    });
    

    describe('Cuando un Usuario reserva una bici', () => {
        it('debe existir la reserva', (done) => {
            const usuario = new Usuario({ nombre: 'Nicoll' });
            usuario.save()
                .then(() => {
                    const bicicleta = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
                    return bicicleta.save();
                })
                .then((bicicleta) => { 
                    var hoy = new Date();
                    var mañana = new Date();
                    mañana.setDate(hoy.getDate() + 1);
                    return new Promise((resolve, reject) => {
                        usuario.reservar(bicicleta.id, hoy, mañana, (err, reserva) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(reserva);
                            }
                        });
                    });
                })
                .then(() => {
                    return Reserva.find({}).populate('bicicleta').populate('usuario').exec();
                })
                .then((reservas) => {
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                })
                .catch((err) => {
                    console.error(err);
                    done.fail(err);
                });
        });
    });
    
    
})
