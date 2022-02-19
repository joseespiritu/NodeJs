const fs = require("fs");

const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    // Capitalizar
    // let nuevoHistorialCapitalizado = [];
    // this.historial.map((lugar) => {
    //   const palabraLugar = lugar.split(" ");
    //   for (var i = 0; i < palabraLugar.length; i++) {
    //     palabraLugar[i] =
    //       palabraLugar[i].charAt(0).toUpperCase() + palabraLugar[i].slice(1);
    //   }
    //   const nuevaPalabra = palabraLugar.join(" ");
    //   nuevoHistorialCapitalizado.push(nuevaPalabra);
    // });
    // this.historial = nuevoHistorialCapitalizado;
    // return this.historial;

    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      //   peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat = "", lon = "") {
    try {
      // Instance axios.create()
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.paramsWeather, lat, lon },
      });

      // resp.data
      const { data } = await instance.get();

      return {
        desc: data.weather[0].description,
        min: data.main.temp_min,
        max: data.main.temp_max,
        temp: data.main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar.toLowerCase());

    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    // Debe de existir....
    if (!fs.existsSync(this.dbPath)) return;

    // const info ...readFile encoding: 'utf-8'
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

module.exports = Busquedas;
