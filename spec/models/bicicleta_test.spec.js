//Nicoll Yuliana Acosta Delgado

var mongoose = require('mongoose')

var Bicicleta = require('../../models/bicicleta')

describe('Testing Bicicleta', function(){
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
    Bicicleta.deleteMany({})
        .then(() => done())
        .catch(err => console.error(err));
});


  describe('Bicileta.createInstance', () => {
    it('Crea una instancia de Bicicleta', () => {
        var bici = Bicicleta.createInstance(1, "verde", "urbana", [4.57,-74.1])

        expect(bici.code).toBe(1)
        expect(bici.color).toBe("verde")
        expect(bici.modelo).toBe("urbana")
        expect(bici.ubicacion[0]).toEqual(4.57)
        expect(bici.ubicacion[1]).toEqual(-74.1)
    })
  })

  describe('Bicicleta.allBicis', () => {
    it('Comienza vacia' , (done) => {
        Bicicleta.allBicis(function(err, bicis){
          expect(bicis.length).toBe(0);
          done()
      })
    })
  })

  describe('Bicicleta.add', () => {
    it('agrega una sola bici', (done) => {
      var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"})
      Bicicleta.add(aBici, function(err, newBici){
        if (err) console.log(err);
        Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toEqual(1)
            expect(bicis[0].code).toEqual(aBici.code)
            done()
        })
      })
    })
  })

  describe('Bicicleta.findByCode', () => {
    it('Debe devolcer la bici con code 1', (done) => {
      Bicicleta.allBicis(function(err, bicis){
        expect(bicis.length).toBe(0)

        var aBici1 = new Bicicleta({code: 1, color: "verde", modelo: "urbana"})
        Bicicleta.add(aBici1, function(err, newBici){
            if (err) console.log(err)

            var aBici2 = new Bicicleta({code: 2, color: "roja", modelo: "montaña"})
            Bicicleta.add(aBici2, function(err, newBici){
              if (err) console.log(err)
              Bicicleta.findByCode(1, function(error, targetBici){
                expect(targetBici.code).toBe(aBici.code)
                expect(targetBici.color).toBe(aBici.color)
                expect(targetBici.modelo).toBe(aBici.modelo)
                done()
              })
            })
        })
      })
    })
  } )

})


