"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude]
      
      map = L.map('map').setView(coords, 13);
        console.log(map)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


map.on('click', function(mapE) {
  mapEvent = mapE
  form.classList.remove('hidden');
  inputDistance.focus()
})
},
function () {
  alert("you dont a have a location set");
}
);
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // clear inputs
  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
 
  const { lat, lng } = mapEvent.latlng
   console.log(mapEvent)
  L.marker([lat, lng])
      .addTo(map)
      .bindPopup(L.popup({
        maxWidth: 300,
        minWidth: 100,
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup' //deifined within css
      })
      )
      .setPopupContent('Workout')
      .openPopup();
  
})

inputType.addEventListener('change', function() {
  inputElevation.closest('.form__row').classList.toggle("form__row--hidden")
  inputCadence.closest('.form__row').classList.toggle("form__row--hidden")
})