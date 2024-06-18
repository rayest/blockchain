export default class CurrentLocation {
  constructor() {
    this._lat = null;
    this._lon = null;
    this._name = "Current Location";
    this._unit = "imperial";
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getLat() {
    return this._lat;
  }

  setLat(lat) {
    this._lat = lat;
  }

  getLon() {
    return this._lon;
  }

  setLon(lon) {
    this._lon = lon;
  }

  getUnit() {
    return this._unit;
  }

  setUnit(unit) {
    this._unit = unit;
  }


  // Toggle between imperial and metric units
  toggleUnit() {
    if (this._unit === "imperial") {
      this._unit = "metric";
    } else {
      this._unit = "imperial";
    }
  }



  async get() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          resolve(this);
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }
}
