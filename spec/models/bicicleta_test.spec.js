//Nicoll Yuliana Acosta Delgado

var Bicicleta = require('../../models/bicicleta')

/*asegura que el array allBicis de la clase Bicicleta esté vacío 
antes de cada prueba.*/

beforeEach(() => {Bicicleta.allBicis = []})

/*prueba si el array allBicis comienza vacío*/

describe("Bicicleta.allBicis", () => {
  it("comienza vacia", function() {
    expect(Bicicleta.allBicis.length).toBe(0);
  })
})

/*prueba el método add de la clase Bicicleta, donde se crea una nueva 
bicicleta (a) y se agrega al array allBicis. Luego se verifica que la 
bicicleta se agregó correctamente.*/

describe('Bicicleta.add', () => {
  it("agregamos una", () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    var a = new Bicicleta(1, 'verde', 'urbana', [4.5797, -74.1575])
    Bicicleta.add(a)

    expect(Bicicleta.allBicis.length).toBe(1)
    expect(Bicicleta.allBicis[0]).toBe(a)
  })
})

/*prueba el método findById de la clase Bicicleta. Se crean dos 
bicicletas y se agregan al array allBicis, luego se busca una bicicleta
por su id y se verifican sus atributos.

*/

describe("Bicicleta.findById", () => {
  it("debe buscar la bicicleta con el id correspondiente", function() {
    expect(Bicicleta.allBicis.length).toBe(0)
    var aBici1 = new Bicicleta(1, "verde", "urbana")
    var aBici2 = new Bicicleta(2, "rojo", "montaña")
    Bicicleta.add(aBici1)
    Bicicleta.add(aBici2)

    var targetBici = Bicicleta.findById(1)
    expect(targetBici.id).toBe(aBici1.id)
    expect(targetBici.color).toBe(aBici1.color)
    expect(targetBici.modelo).toBe(aBici1.modelo)

    var targetBici = Bicicleta.findById(100)
    expect(null).toBe(targetBici)
  })
})

/*prueba el método removeById de la clase Bicicleta. Se agregan tres 
bicicletas al array allBicis, luego se elimina una de ellas por su id y
se verifica que haya sido eliminada correctamente.*/

describe("Bicicleta.removeById", () => {
  it("debe eliminar una bicicleta", function() {
    expect(Bicicleta.allBicis.length).toBe(0)
    var aBici1 = new Bicicleta(1, "verde", "urbana")
    var aBici2 = new Bicicleta(2, "rojo", "montaña")
    var aBici3 = new Bicicleta(3, "blanca", "ruta")
    Bicicleta.add(aBici1)
    Bicicleta.add(aBici2)
    Bicicleta.add(aBici3)

    expect(Bicicleta.allBicis.length).toBe(3)

    Bicicleta.removeById(1)
    expect(Bicicleta.allBicis.length).toBe(2)

    var targetBici1 = Bicicleta.findById(1)
    expect(null).toBe(targetBici1)

    var targetBici2 = Bicicleta.findById(2)
    expect(targetBici2.id).toBe(aBici2.id)
    expect(targetBici2.color).toBe(aBici2.color)
    expect(targetBici2.modelo).toBe(aBici2.modelo)

    var targetBici3 = Bicicleta.findById(3)
    expect(targetBici3.id).toBe(aBici3.id)
    expect(targetBici3.color).toBe(aBici3.color)
    expect(targetBici3.modelo).toBe(aBici3.modelo)

    Bicicleta.removeById(1)
    expect(Bicicleta.allBicis.length).toBe(2)


  })
})

