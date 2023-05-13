var map;
var markers = [];


function initMap() {
  var mapOptions = {
    center: { lat: 19.00015989185657, lng: -98.20027366913992 },
    zoom: 16,
    disableDefaultUI: true // Para ocultar los controles de Google Maps
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");

  var autocomplete = new google.maps.places.Autocomplete(searchInput);
  autocomplete.bindTo("bounds", map);

  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var searchQuery = searchInput.value;
    searchPlaces(searchQuery);
  });

  var alimentosButton = document.getElementById("alimentos-button");
  var saludButton = document.getElementById("salud-button");
  var comprasButton = document.getElementById("compras-button");

  alimentosButton.addEventListener("click", function() {
    searchPlaces("restaurantes");
  });

  saludButton.addEventListener("click", function() {
    searchPlaces("farmacias");
  });

  comprasButton.addEventListener("click", function() {
    searchPlaces("tienda");
  });
}

function searchPlaces(query) {
  var placesService = new google.maps.places.PlacesService(map);
  var request = {
    query: query,
    bounds: map.getBounds()
  };

  placesService.textSearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Limpiar los marcadores y resultados anteriores
      clearMarkers();

      results.forEach(function(result) {
        createMarker(result);
      });

      if (results.length > 0) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert("No se encontraron resultados para la búsqueda.");
      }
    } else {
      alert("Error al realizar la búsqueda.");
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name
  });

  markers.push(marker);
}

function clearMarkers() {
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
}

