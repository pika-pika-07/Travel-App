// Require Express to run server and routes
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");
// Start up an instance of app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server

const port = 3000;
const server = app.listen(port, listening);

function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
}

//Adding Routes

/* Get route */

const fetchGeoCordinates = async (location) => {
  const baseUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=pika`;
  try {
    const response = await fetch(baseUrl);

    const data = response.json();

    return data;
  } catch (err) {
    throw err;
  }
};

const fetchWeatherForeCast = async (days, lat, lon) => {
  let url = "https://api.weatherbit.io/v2.0/forecast/daily";
  const apiKey = "6b3ab930b62a4c22a37463f203c85c3a";

  //   if (days < 7) {
  //     url = "https://api.weatherbit.io/v2.0/current";
  //   } else {
  //     url = "https://api.weatherbit.io/v2.0/forecast/daily";
  //   }

  const response = await fetch(
    `${url}?lat=${lat}&lon=${lon}&key=${apiKey}&days=${days}`
  );

  try {
    const data = await response.json();
    return {
      max_temp: data.data[days - 1].max_temp,
      min_temp: data.data[days - 1].min_temp,
      description: data.data[days - 1].weather.description,
    };
  } catch (err) {
    console.log("Errordfsfgsdgs", err);
    throw err;
  }
};

const fetchGeo = async (req, res) => {
  console.log(req.query);
  const { destination } = req.query;

  try {
    const response = await fetchGeoCordinates(destination);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

const fetchForecast = async (req, res) => {
  const days = req.query.days;
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    const response = await fetchWeatherForeCast(days, lat, lon);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

app.get("/geoNames", fetchGeo);

app.get("/forecast", fetchForecast);

module.exports = {
  server,
  app,
};
