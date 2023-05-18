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

class App {
  #map;
  #mapEvent
  constructor() {
    this._getPosition()

    form.addEventListener("submit", this._newWorkout.bind(this));
    
    inputType.addEventListener("change", this._toggleElevationField);
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
          alert("you dont a have a location set");
        }
      );
      console.log(this)
  }
  _loadMap(position) {
      // console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];

      this.#map = L.map("map").setView(coords, 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);

      this.#map.on("click", this._showForm.bind(this));
    }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkout(e) {
    e.preventDefault();

    // clear inputs
    inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      "";

  const { lat, lng } = this.#mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(this.#map)
    .bindPopup(
      L.popup({
        maxWidth: 300,
        minWidth: 100,
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup", //deifined within css
      })
    )
    .setPopupContent("Workout")
    .openPopup();
  }
}
const app = new App();



