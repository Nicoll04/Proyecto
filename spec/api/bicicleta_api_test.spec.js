//Nicoll Yuliana Acosta Delgado

var Bicicleta = require('../../models/bicicleta')
var request = require('request')
var server = require('../../bin/www')

beforeEach(() => {Bicicleta.allBicis = []})

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /' , ()=> {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'Morado', 'Electric', [4.606870, -74.055439])
            Bicicleta.add(a)

            request.get('http://localhost:5000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            })
        })
    })

    describe('POST BICICLETAS /create' , ()=> {
        it('Status 200', (done) => {
            var headers = {'content-type' : 'application/json'}
            var aBici ='{"id": 10, "color": "rojo", "modelo": "urbano", "lat": 4, "lng": -74}'
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo")
                done()
            })
        })
    })
    /*
    describe('PUT BICICLETAS /update', () => {
        it('Status 200', (done) => {
            var a = new Bicicleta(1, 'Morado', 'Electric', [4.606870, -74.055439]);
            Bicicleta.add(a);

            var updatedBici = {"id": 1, "color": "azul", "modelo": "urbano", "lat": 4, "lng": -74};

            request.put({
                headers: {'content-type': 'application/json'},
                url: 'http://localhost:5000/api/bicicletas/update',
                body: JSON.stringify(updatedBici)
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe("azul");
                done();
            });
        });
    });

    describe('DELETE BICICLETAS /delete', () => {
        it('Status 200', (done) => {
            var a = new Bicicleta(1, 'Morado', 'Electric', [4.606870, -74.055439]);
            Bicicleta.add(a);

            request.delete('http://localhost:5000/api/bicicletas/delete/1', function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            });
        });
    });
    */

})

