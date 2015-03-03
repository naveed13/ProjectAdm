var latitude;
var longitude;
var map;
var searchType;
var searchResult;
var place;
var loc;
var add;
var rating;
var infowindow;

/**
* Using the autocomplete constructor object we are able to suggest user address
* when the user types it in the text box. Once the address input is complete and
* saved in variable autocomplete we use the google eventlistener to generate the
* latitude and longitude.
*/
var autocomplete = new google.maps.places.Autocomplete(document.getElementById('userLocation'));
google.maps.event.addListener(autocomplete, 'place_changed', function() {
  latitude = autocomplete.getPlace().geometry.location.lat();
  longitude = autocomplete.getPlace().geometry.location.lng();
});

document.getElementById('restaurant').addEventListener('click',function (){
  searchType = 'food';
  details();
});

document.getElementById('hospital').addEventListener('click',function (){
  searchType = 'hospital';
  details();
});

document.getElementById('atm').addEventListener('click',function (){
  searchType = 'atm';
  details();
});

document.getElementById('bus_station').addEventListener('click',function (){
  searchType = 'bus_station';
  details();
});

document.getElementById('subway_station').addEventListener('click',function (){
  searchType = 'subway_station';
  details();
});

document.getElementById('beauty_salon').addEventListener('click',function (){
  searchType = 'beauty_salon';
  details();
});

document.getElementById("movie_theatre").addEventListener('click',function (){
  searchType = 'movie_theatre';
  details();
});

document.getElementById("bar").addEventListener('click',function (){
  searchType = 'bar';
  details();
});

document.getElementById('grocery_or_supermarket').addEventListener('click',function (){
  searchType = 'grocery_or_supermarket';
  details();
});

document.getElementById('night_club').addEventListener('click',function (){
  searchType = 'night_club';
  details();
});

document.getElementById('reload').addEventListener('click',function (){
  location.reload();
});


function details(){
  createMap();
  searchPlace();
  updateHtml();
};

/**
* function createMap will use the google Map API.
* It will first create a place using the constructor object
* new google.maps.LatLng(lat, long), the lat and long are created from
* the autocomplete above.
* An object with map center(which is the place), zoom and type of map is created.
* The above object will be passed on to the google map constructor
* new google.maps.Map() to build the map.
* The map is placed on the page.
* marker is created using the autcomplete address and placed on the map.
*/
function createMap(){
  place = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    center: place,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 15
  }
  map = new google.maps.Map(document.getElementById('mapOfLoc'), mapOptions);

      var placeLoc = autocomplete.getPlace().geometry.location;
      var marker = new google.maps.Marker({ map: map, position: autocomplete.getPlace().geometry.location});
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
      infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("You Are Here");
        infowindow.open(map, this);
      });
};

/**
* function searchPlace will use the Google Maps API library - Places.
* A search area is created using the google constructor object
* new google.maps.places.PlacesService(map)by passing it the
* map(required to get the center for search) created using the createMap function above.
* An object for search request is created with required properties.
* The object for search request is passed on to the nearbysearch constructor method
* along with with a callback function(we use the call back function in order not
* to wait for the result, and continue) which will check the status and get
* requested data, the data recieved from it is used as per requirement.
* Since the search is based on distance it will use first choice of the data
* recieved.
* marker is create and placed on the searched place.
*/
function searchPlace(){
  var search = new google.maps.places.PlacesService(map);
  var request = {
    keyword: [searchType],
    location: map.getCenter(),
    rankBy: google.maps.places.RankBy.DISTANCE
  }
  search.nearbySearch(request, function(data, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
      loc = data[0].name;
      add = data[0].vicinity;
      rating = data[0].rating;
      latitude = data[0].geometry.location.k;
      longitude = data[0].geometry.location.D;

      var placeLoc = data[0].geometry.location;
      var marker = new google.maps.Marker({ map: map, position: data[0].geometry.location});
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(data[0].name);
        infowindow.open(map, this); //google
      });
  // var loc = data[0].place_id;

    }
  });

};

/**
* function updateHtml updates the page with required details
*/
function updateHtml(){
  searchResult = document.getElementById('name');
  searchResult.textContent = 'Name   : ' + loc;

  searchResult = document.getElementById('address');
  searchResult.textContent = 'Address: ' + add;

  searchResult = document.getElementById('rating');
  searchResult.textContent = 'Rating : ' + rating;
};






