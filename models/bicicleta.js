//Nicoll Yuliana Acosta Delgado

/*
Define el constructor de la clase Bicicleta, que acepta cuatro parámetros
(ID, color, modelo y ubicación) y los asigna a las propiedades 
correspondientes del objeto bicicleta creado.
*/

var Bicicleta = function (id, color, modelo, ubicacion){
  this.id = id
  this.color = color
  this.modelo = modelo
  this.ubicacion = ubicacion
}

Bicicleta.prototype.toString = function(){
  return 'id: '+this.id + ' | color: '+ this.color
}

/*
Define una propiedad allBicis, que es un arreglo que 
almacenará todas las instancias de bicicletas creadas.
*/

Bicicleta.allBicis = []

/*
Define un método add que agrega una bicicleta al 
arreglo allBicis solo si no existe otra bicicleta con el mismo ID.
Si ya existe una bicicleta con el mismo ID, emite un mensaje de error.
*/

Bicicleta.add = function (aBici){
  const index = Bicicleta.findIndexById(aBici.id)
  if (index == null){
    Bicicleta.allBicis.push(aBici)
  } else {
    console.error("Ya existe una bicicleta con Id = "+aBici.id)
  }
}

/*
Define un método findIndexById que busca el índice de 
una bicicleta en el arreglo allBicis por su ID.
*/

Bicicleta.findIndexById = function(aBiciId){
  const condicion = (e) => e.id == aBiciId;
  const index = Bicicleta.allBicis.findIndex(condicion)
  return index < 0 ? null : index
}

/*
Define un método findById que encuentra y devuelve una 
bicicleta por su ID.
*/

Bicicleta.findById = function(aBiciId){
  const index = Bicicleta.findIndexById(aBiciId)
  return index == null ? null : Bicicleta.allBicis[index]
}

/*
Define un método removeById que elimina una bicicleta
del arreglo allBicis por su ID.
*/

Bicicleta.removeById = function(aBiciId){
  const index = Bicicleta.findIndexById(aBiciId)
  if (index != null){Bicicleta.allBicis.splice(index,1)}
}

/*
var a = new Bicicleta(1, 'verde', 'urbana', [4.5797436491269075, -74.15752143352218]);
var b = new Bicicleta(2, 'rojo', 'urbana', [4.658629302804913, -74.09339353167381]);
var c = new Bicicleta(3, 'Morado', 'Electric', [4.60687042436782, -74.05543974244905]);

Bicicleta.add(a);
Bicicleta.add(b);
Bicicleta.add(c);

Se exporta la clase Bicicleta para que pueda ser utilizada en otros
archivos como un módulo.
*/

module.exports = Bicicleta
