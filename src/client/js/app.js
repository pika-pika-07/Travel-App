/* Global Variables */
import { getDays, checkUserInput } from "./helper";
import {
  createTripImg,
  createTripInfo,
  createTripButtons,
} from "./buildTripCard";
let count = 10;
const apiBaseURL = "http://localhost:3000";

export const plan = async () => {
  const destinationCity = document.querySelector("#input-destination").value;
  const startDate = document.querySelector("#input-start-date").value;
  const endDate = document.querySelector("#input-end-date").value;

  try {
    checkUserInput(destinationCity, startDate, endDate);

    const diffDays = getDays(startDate, endDate);

    const geoData = await fetchGeoCordinates(destinationCity);
    const coordinates = geoData.geonames[0];

    const forecastData = await fetchForecast(
      diffDays,
      coordinates.lat,
      coordinates.lng
    );

    const imageUrl = await fetchImage(destinationCity);

    const obj = {
      city: destinationCity,
      imageUrl: imageUrl,
      diffDays: diffDays,
      temp: forecastData.temperature,
      description: forecastData.description,
      countryName: coordinates.countryName,
    };
    createTripCard(
      count + 1,
      coordinates,
      forecastData,
      imageUrl,
      startDate,
      endDate,
      diffDays
    );
    // await updateUI(obj);
  } catch (err) {
    console.log(err);
    return;
  }
};

const fetchGeoCordinates = async (location) => {
  const url = `${apiBaseURL}/geoNames`;
  const response = await fetch(`${url}?destination=${location}`);

  try {
    const data = await response.json();
    console.log("resSSSSSS", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

const fetchForecast = async (days, lat, lng) => {
  const url = `${apiBaseURL}/forecast`;

  const response = await fetch(`${url}?days=${days}&lat=${lat}&lon=${lng}`);

  try {
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

const fetchImage = async (city) => {
  const apiKey = "37685063-6f00dae4135d76e834728903c";
  const url = `https://pixabay.com/api/?key=${apiKey}&category=places&q=${city}&image_type=photo&pretty=true`;

  const response = await fetch(url);

  try {
    const data = await response.json();
    const img = data["hits"][0]["webformatURL"];
    return img;
  } catch (err) {
    console.log("Error", err);
  }
};

// const updateUI = async (data) => {
//   document.getElementById("img").setAttribute("src", data.imageUrl);
//   document.getElementById(
//     "result-div"
//   ).innerHTML = `<p>${data.city} is ${data.diffDays} days away.</p><p>The weather for that time is: <br> Temperature: ${data.temp} <br> ${data.description}</p>`;
// };

const createTripCard = (
  unique_identifier,
  geoNamesData,
  weatherbitData,
  imageUrl,
  startDate,
  endDate,
  tripDuration
) => {
  console.log("6.) Start function createTripCard");

  // ----------------------------------------
  // 2.6.1) Create new trip-card
  // ----------------------------------------
  const trip_card = document.createElement("div");
  trip_card.setAttribute("class", "trip-card");

  // ----------------------------------------
  // 2.6.2) Create trip-img
  // ----------------------------------------
  createTripImg(trip_card, geoNamesData, imageUrl);

  // ----------------------------------------
  // 2.6.3) Create trip-info
  // ----------------------------------------
  createTripInfo(
    trip_card,
    geoNamesData,
    weatherbitData,
    startDate,
    endDate,
    4,
    tripDuration
  );

  // ----------------------------------------
  // 2.6.4) Create trip-buttons
  // ----------------------------------------
  createTripButtons(trip_card, unique_identifier);

  // ----------------------------------------
  // 2.6.5) Add new trip card to HTML parent div
  // ----------------------------------------
  document.getElementById("trip-cards").prepend(trip_card);
};
