
const bts = document.getElementById("button");
function handleClick() {
    const nextPageUrl = "/Products";
    window.location.href = nextPageUrl;
}

const cartBtn = document.getElementById("cart");
function nav_to_cart() {
    const nextPageUrl = "/cart";
    window.location.href = nextPageUrl;
}


const signbtn = document.getElementById("hello-bt");
function nav_to_signin() {
    const nextPageUrl = "/login";
    window.location.href = nextPageUrl;
}
signbtn.addEventListener("click", nav_to_signin);



bts.addEventListener("click", handleClick);
function toggleCard() {
    var cardContainer = document.getElementById('card-container');
    cardContainer.style.display = (cardContainer.style.display === 'none') ? 'block' : 'none';
  }

// function hideCard() {
//     var cardContainer = document.getElementById('card-container');
//     if (event.target !== cardContainer && !cardContainer.contains(event.target)) {
//       cardContainer.style.display = 'none';
//     }
// }


function updateQuantity(change) {
    var quantityInput = document.querySelector('.quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = Math.max(1, currentQuantity + change);
  }


mapboxgl.accessToken = 'pk.eyJ1IjoibGFoYXJpa2VtYnVydSIsImEiOiJjbHJ1dDFqdHIwbW04MmpwYnppOGhnYmprIn0.ny_r49PqYXLEbhjfCM8YvA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [0, 0],
  zoom: 8
});

function getLocationFromPincode(pincode) {
  var geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pincode}.json?access_token=${mapboxgl.accessToken}`;
  fetch(geocodingUrl)
  .then(response => response.json())
  .then(data => {
    var city = data.features[0].context.find(context => context.id.includes('place')).text;
    if (city) {
        document.querySelector('.changelocation').innerText = `${city}`;
    } else {
        console.error('City not found in the response.');
    }
})
.catch(error => {
        console.error('Error:', error);
        document.getElementById('locationOutput').textContent = 'Error fetching location.';
        });
        }

function addMarker(location) {
   new mapboxgl.Marker()
  .setLngLat(location)
  .addTo(map);
}

function getLocation() {
  var pincode = document.getElementById('pincode').value;
  getLocationFromPincode(pincode).then(location => {
  addMarker(location);
});}

