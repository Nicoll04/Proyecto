//Nicoll Yuliana Acosta Delgado

var Bicicleta = require('../../models/bicicleta')

/*
Esta función maneja la solicitud GET para obtener una lista de todas las bicicletas disponibles. Utiliza el método allBicis de la clase
Bicicleta para obtener todas las bicicletas y devuelve una respuesta JSON con el arreglo de bicicletas.
*/

exports.bicicleta_list = function (req, res){
  res.status(200).json({
    bicicletas: Bicicleta.allBicis
  })
}

/*
Esta función maneja la solicitud POST para crear una nueva bicicleta. Primero, elimina cualquier bicicleta existente con el mismo ID
que se envía en el cuerpo de la solicitud. Luego, crea una nueva instancia de la clase Bicicleta con los datos proporcionados en el cuerpo de
la solicitud (ID, color, modelo) y la ubicación proporcionada en las coordenadas latitud y longitud. Agrega esta nueva bicicleta a la lista 
de bicicletas y devuelve una respuesta JSON con los detalles de la bicicleta creada.
*/

exports.bicicleta_create = function(req, res){
  Bicicleta.removeById(req.body.id)
  var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
  bici.ubicacion = [req.body.lat, req.body.lng]

  Bicicleta.add(bici)

  res.status(200).json({bicicleta: bici})
}

/*
Esta función maneja la solicitud PUT para actualizar los detalles de una bicicleta existente. Busca una bicicleta por su ID, que se envía 
en el cuerpo de la solicitud como id_busqueda. Si se encuentra una bicicleta con ese ID, actualiza sus detalles (ID, color, modelo y ubicación)
según los datos proporcionados en el cuerpo de la solicitud y devuelve una respuesta JSON con los detalles actualizados de la bicicleta.
Si no se encuentra ninguna bicicleta con el ID proporcionado, devuelve un mensaje indicando que no se encontró ninguna bicicleta con ese ID.
*/

exports.bicicleta_update = function(req, res){
  var bici = Bicicleta.findById(req.body.id_busqueda)
  if(bici){
    bici.id = req.body.id
    bici.color = req.body.color
    bici.modelo = req.body.modelo
    bici.ubicacion = [req.body.lat,req.body.lng]
    res.status(200).json({bicicleta: bici})
  } else {
    res.send("no se encontró una bicicleta con este id "+ req.body.id_busqueda)
  }
}

/*
Esta función maneja la solicitud DELETE para eliminar una bicicleta por su ID, que se envía en el cuerpo de la solicitud. 
Elimina la bicicleta con el ID proporcionado y devuelve una respuesta con el código de estado 204 (sin contenido), lo que indica que la
operación se realizó correctamente pero no hay contenido para devolver.
*/

exports.bicicleta_delete = function(req, res){
  Bicicleta.removeById(req.body.id)
  res.status(204).send()
}
