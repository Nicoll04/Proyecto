//Nicoll Yuliana Acosta Delgado

var map = L.map('main_map').setView([4.66, -74.13], 12)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


$.ajax({
  dataType: "json",
  url: "api/bicicletas",
  success: function(result){
    console.log(result)
    result.bicicletas.forEach(function(bici){
      L.marker(bici.ubicacion, {title: bici.id}).addTo(map)
    })
  }
})
