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

class Workkout {
  date = new Date()
  id = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords // [lat,lng]
    this.distance = distance // distance in km
    this.duration = duration // time in minutes
}
}

class Running extends Workkout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords)
    this.cadence = cadence
    this.calcPace();
  }
  
  calcPace() {
    this.pace = this.duration / this.distance
    return this.pace
  }
}
class Cycling extends Workkout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration)
    this.elevationGain = elevationGain
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed
  }
}
// const run1 = new Running([40, -12.3], 10, 250, 500 )
// const cycling1 = new Cycling([40, -12.3], 510, 120, 421)
// console.log(run1, cycling1)
// /////////////////////////////////////////////////////////////
class App {
  #map;
  #mapEvent;
  constructor() {
    console.log(this)
    this._getPosition();

    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toggleElevationField);
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("you dont a have a location set");
        }
      );
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
