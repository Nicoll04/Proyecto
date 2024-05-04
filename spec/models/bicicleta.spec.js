var Bicicleta = require('../../models/bicicleta')

beforeEach(() => {Bicicleta.allBicis = []})

describe("Bicicleta.allBicis", () => {
  it("comienza vacia", function() {
    expect(Bicicleta.allBicis.length).toBe(0);
  })
})

describe('Bicicleta.add', () => {
  it("agregamos una", () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    var a = new Bicicleta(1, 'rojo', 'urbana', [4.6718,-74.0638])
    Bicicleta.add(a)

    expect(Bicicleta.allBicis.length).toBe(1)
    expect(Bicicleta.allBicis[0]).toBe(a)
  })
})

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

    var aBici4 = new Bicicleta(3, "verde", "montaña")
    Bicicleta.add(aBici4)

  })
})
