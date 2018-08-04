

function initMap (){
  // options for the map
  var options = {
    zoom: 11,
    center:{lat: 42.3601,lng:-71.0589}
  }

  // new map
  var map = new
  google.maps.Map(document.getElementById('map'), options);



// Putting all of the restaurants into an array
var markers = [
  {
    // ------------- Clover ----------------
    coords:{lat:42.357757,lng:-71.05902},
    title: 'CloverDTX',
    content:
    '<h1> CloverDTX (downtown)</h1>'+
    '<p>27 School Street</p>'+
    '<p>CloverDTX was our very first Boston restaurant when it opened in spring 2016! We used to operate a truck near the Park St. T stop and were so excited when we found this location on School St. Stop in while youre on the Freedom Trail or while shopping in Downtown Crossing and youll meet some of the friendliest Clover employees in the land.</p>'
  },

  {
    // ------------- Taco Party ----------------
    coords:{lat:42.4001506,lng:-71.112323},
    title: 'Taco Party',
    content:
    '<h1> Taco Party</h1>'+
    '<p>711 Broadway</p>'+
    '<p>Our mission is simple. To show that food made only from plants can delight and fulfill you. Please visit us at our shop in the Ball Square neighborhood of Somerville or find our food truck roaming the streets of Boston throughout the week.</p>'
  },

  {
    // ------------- Red Lentil ----------------
    coords:{lat:42.3709907,lng:-71.1586435},
    title: 'Red Lentil',
    content:
    '<h1> Red Lentil</h1>'+
    '<p>600 Mount Auburn Street</p>'+
    '<p>Red Lentil is an award-winning vegan & vegetarian restaurant in Watertown, Massachusetts. Our creative culinary approach and commitment to the best ingredients have delighted Boston locals since 2009.</p>'
  },

{
  // ------------- My thai ----------------
  coords:{lat:42.3514447,lng:-71.0627071},
  title: 'My Thai Vegan Cafe',
  content:
  '<h1> My Thai Vegan Cafe</h1>'+
  '<p>3 Beach st</p>'+
  '<p>The Cafe offers an all-vegan menu of flavorful and exotic Thai dishes, beautifully presented, along with a multitude of hot and cold beverages and an array of vegan desserts.</p>'
},

    {
      // ------------ oasis --------------
    coords:{lat: 42.2994622,lng:-71.0736924},
    title: 'Oasis Veggie Parlor',
    content:
    '<h1>Oasis Veggie Parlor</h1>'+
    '<p>test</p>'+
    '<p>Healthy and affordable aren\u2019t often synonymous, but that\u2019s not the case with Oasis: diners won\u2019t spend much more than $10 on a meal. Along with an array of vegan food, Oasis also offers fresh-squeezed juices and smoothies.</p>'
  },

  {
    // ------------ Cuong's --------------
  coords:{lat:42.3514447,lng:-71.0627071},
  title: 'Cuongs Vegan Sandwiches',
  content:
  '<h1>Cuongs Vegan Sandwiches</h1>'+
  '<p>5 Beach st</p>'+
  '<p>Cafe serving Asian-inspired, veggie-focused fare, plus bubble teas flavored with tropical fruits.</p>'
},

{
// ------------ piperi's --------------
coords:{lat:42.35848,lng:-71.060827},
title: 'Piperi Mediterranean Grill ',
content:
'<h1>Piperi Mediterranean Grill </h1>'+
'<p>1 Beacon st</p>'+
'<p>Not a vegan restaurant but Piperi\u2019s Mediterranean style lends itself to a vegan diet. The create-your-own option allows you to make your own vegan sandwich, salad, or rice plate. </p>'
},

{
// ------------ chloe's --------------
coords:{lat:42.34471,lng:-71.100098},
title: 'by CHLOE ',
content:
'<h1>by CHLOE </h1>'+
'<p>100 Van Ness st</p>'+
'<p>Fast-casual vegan restaurant serving up burgers, fries, salads, sweet treats, and more </p>'
},

{
// ------------ veggie crust --------------
coords:{lat:42.382319,lng:-71.102434},
title: 'Veggie Crust',
content:
'<h1>Veggie Crust </h1>'+
'<p>445 Somerville Ave</p>'+
'<p>You dont have to miss out on a great pie as a vegan. Veggie crust offeres plenty of pizza flavors which can be veganized. There are also pastas, salads, and a vegan bar that serves fresh juices. </p>'
},

  {
    // ------------- veggie galaxy ----------------
    coords:{lat:42.3634198,lng:-71.1012291},
    title: 'Veggie Galaxy',
    content:
    '<h1> Veggie Galaxy</h1>'+
    '<p>450 Massachusetts Avenue</p>'+
    '<p>Veggie Galaxy offers traditional diner comfort food made from scratch: the twist is that its all vegetarian (and everything can be made vegan!) Our on-site bakery is 100% vegan.</p>'
  },

  {
  // ------------ fruition vegan kitchen --------------
  coords:{lat:42.421044,lng:-71.132139},
  title: 'Fruition Vegan Kitchen',
  content:
  '<h1>Fruition Vegan Kitchen </h1>'+
  '<p>472 High st</p>'+
  '<p>Diverse menu, which changes frequently, features salads, soups, and entrees with an international flare. Weekly food delivery service is also available in certain towns. </p>'
},

{
// ------------ cocobeet --------------
coords:{lat:42.359449,lng:-71.058858},
title: 'Cocobeet',
content:
'<h1>Cocobeet </h1>'+
'<p>100 City Hall Plaza</p>'+
'<p>Juice bar also serving organic smoothie bowls, grain bowls, salads, and sandwiches. Also provides juices for all you juice cleansing needs. </p>'
},

{
// ------------ Dig Inn --------------
coords:{lat:42.357612,lng: -71.05839},
title: 'Dig Inn',
content:
'<h1>Dig Inn </h1>'+
'<p>277 Washington st</p>'+
'<p>Ethically sourced local foods are on the menu here. Plant-based bowl options are plenty and full of nutritious veggies. </p>'
},

{
// ------------ The Friendly Toast --------------
coords:{lat:42.348591,lng: -71.07313},
title: 'The Friendly Toast',
content:
'<h1>The Friendly Toast </h1>'+
'<p>35 Stanhope st</p>'+
'<p>Classic diner fare with vegan options and substitutions available </p>'
},

{
// ------------ Fiores bakery--------------
coords:{lat:42.307959,lng: -71.115723},
title: 'Fiores Bakery',
content:
'<h1>Fiores Bakery </h1>'+
'<p>55 South st</p>'+
'<p>Vegan options for their all day breakfast, sandwiches, coffee, and plenty of desserts. </p>'
}
]


// loop through markers array instead of calling the add marker function 50 different times
for(var i = 0; i < markers.length;i++){
  addMarker(markers[i]);
}


// function for adding a Marker
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
      title:props.title,
    })

    // check to see if there's an infowindow
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
        // content:contentString
      });

      // if the pointer is clicked open the infowindow
      marker.addListener('click', function() {
       infoWindow.open(map,marker);
   });
    }
  }

  // if the user allows the page to track their location
  if (navigator.geolocation) {
    // calls getCurrentPosition
          navigator.geolocation.getCurrentPosition(function(position) {
            // your position is gonna be what google determines as your lat and lng
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // creates a new infoWindow
            infoWindow = new google.maps.InfoWindow;
            // sets the position of the infowindow to your current lng and lat
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            // sets your location to the center of the map
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

//testing

var thumbUp = document.getElementsByClassName("fa-thumbs-up");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        fetch('restaurants', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'thumbUp':thumbUp,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
