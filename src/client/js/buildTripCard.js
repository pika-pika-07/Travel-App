// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function createTripImg: creates trip img for card
// --------------------------------------------------------------------------------
export const createTripImg = (trip_card, geoNamesData, imageUrl) => {
  console.log("6.1) create trip-img");

  // retrieve object values
  const img_path = imageUrl;
  const city = geoNamesData.city;

  // create div for trip-img
  const trip_card_img = document.createElement("div");
  trip_card_img.setAttribute("class", "trip-card-img");

  // create img
  const img = document.createElement("img");
  img.src = img_path;
  img.alt = city;

  // append img to trip_card
  trip_card_img.appendChild(img);
  trip_card.appendChild(trip_card_img);
};

// --------------------------------------------------------------------------------
// 1.2) function createTripInfo: creates trip information for card
// --------------------------------------------------------------------------------
export const createTripInfo = (
  trip_card,
  geoNamesData,
  weatherbitData,
  startDate,
  endDate,
  dayDifference,
  tripDuration
) => {
  console.log("6.2) create trip-info");

  // create divs for trip-card-info, trip-card-info-main, trip-card-info-stats, trip-card-info-weather
  const trip_card_info = document.createElement("div");
  const trip_card_info_main = document.createElement("div");
  const trip_card_info_stats = document.createElement("div");
  const trip_card_info_weather = document.createElement("div");

  trip_card_info.setAttribute("class", "trip-card-info");
  trip_card_info_main.setAttribute("class", "trip-card-info-main");
  trip_card_info_stats.setAttribute("class", "trip-card-info-stats");
  trip_card_info_weather.setAttribute("class", "trip-card-info-weather");

  // 1.2.1) creates paragraph for 'destination'-info
  createTripInfo_Destination(trip_card_info_main, geoNamesData);

  // 1.2.2) creates paragraph for 'departing'-info
  createTripInfo_Departing(trip_card_info_main, startDate);

  // 1.2.3) creates paragraph for 'returning'-info if end-date has been given
  if (endDate !== "undefined/undefined/") {
    createTripInfo_Returning(trip_card_info_main, endDate);
  }

  // 1.2.4) creates paragraph for 'trip duration'-info if end-date has been given
  if (endDate !== "undefined/undefined/") {
    createTripInfo_TripDuration(trip_card_info_stats, tripDuration);
  }

  // 1.2.5) creates paragraph for 'x days away'-info
  createTripInfo_XDaysAway(trip_card_info_stats, dayDifference, geoNamesData);

  // 1.2.6) creates paragraph for 'weather'-info if departure is in less then 16 days
  if (Object.keys(weatherbitData).length > 0) {
    createTripInfo_Weather(trip_card_info_weather, weatherbitData);
  }

  // append info to trip_card
  trip_card_info.appendChild(trip_card_info_main);
  trip_card_info.appendChild(trip_card_info_stats);
  trip_card_info.appendChild(trip_card_info_weather);
  trip_card.appendChild(trip_card_info);
};

// 1.2.1) function createTripInfo_Destination: creates paragraph for 'destination'-info
function createTripInfo_Destination(trip_card_info_main, geoNamesData) {
  // console.log('6.2.1) create trip-info-destination');

  // retrieve object values
  const city = geoNamesData.city;
  const country = geoNamesData.country;

  // create paragraph with strong element
  const p = document.createElement("p");
  const s = document.createElement("strong");
  s.innerHTML = "My trip to: ";

  p.appendChild(s);
  p.innerHTML += `${city}, ${country}`;

  // append paragraph to trip_card_info_main
  trip_card_info_main.appendChild(p);
}

// 1.2.2) function createTripInfo_Departing: creates paragraph for 'departing'-info
function createTripInfo_Departing(trip_card_info_main, startDate) {
  // console.log('6.2.2) create trip-info-departing');

  // create paragraph with strong element
  const p = document.createElement("p");
  const s = document.createElement("strong");
  s.innerHTML = "Departing: ";

  p.appendChild(s);
  p.innerHTML += startDate;

  // append paragraph to trip_card_info_main
  trip_card_info_main.appendChild(p);
}

// 1.2.3) function createTripInfo_Returning: creates paragraph for 'returning'-info
function createTripInfo_Returning(trip_card_info_main, endDate) {
  // console.log('6.2.3) create trip-info-returning');

  // create paragraph with strong element
  const p = document.createElement("p");
  const s = document.createElement("strong");
  s.innerHTML = "Returning: ";

  p.appendChild(s);
  p.innerHTML += endDate;

  // append paragraph to trip_card_info_main
  trip_card_info_main.appendChild(p);
}

// 1.2.4) function createTripInfo_TripDuration: creates paragraph for 'trip duration'-info
function createTripInfo_TripDuration(trip_card_info_stats, tripDuration) {
  // console.log('6.2.4) create trip-info-trip-duration');

  // create paragraph with strong element
  const p = document.createElement("p");
  const s = document.createElement("strong");
  s.innerHTML = "Trip duration: ";

  p.appendChild(s);

  if (tripDuration > 1) {
    p.innerHTML += `${tripDuration} days`;
  } else {
    p.innerHTML += `${tripDuration} day`;
  }

  // append paragraph to trip_card_info_main
  trip_card_info_stats.appendChild(p);
}

// 1.2.5) function createTripInfo_XDaysAway: creates paragraph for 'x days away'-info
function createTripInfo_XDaysAway(
  trip_card_info_stats,
  dayDifference,
  geoNamesData
) {
  // console.log('6.2.5) create trip-info-x-days-away');

  // retrieve object values
  const city = geoNamesData.city;
  const country = geoNamesData.country;

  // create paragraph with strong element
  const p = document.createElement("p");
  p.innerHTML = `${city}, ${country} is `;

  const s = document.createElement("strong");
  if (dayDifference > 1) {
    s.innerHTML = `${dayDifference} days`;
  } else {
    s.innerHTML = `${dayDifference} day`;
  }

  // append paragraph to trip_card_info
  p.appendChild(s);
  p.innerHTML += " away!";
  trip_card_info_stats.appendChild(p);
}

// 1.2.6) function createTripInfo_weather: creates paragraph for 'weather'-info if departure is in less then 16 days
const createTripInfo_Weather = (trip_card_info_weather, weatherbitData) => {
  // console.log('6.2.6) create trip-info-weather');

  // retrieve object values
  const max_temp = weatherbitData.max_temp;
  const min_temp = weatherbitData.min_temp;
  const weather_description = weatherbitData.weather_description;

  // create multiple paragraphs with strong elements
  const p1 = document.createElement("p");
  const s = document.createElement("strong");
  s.innerHTML = "Typical weather ";
  p1.appendChild(s);
  p1.innerHTML += "for then is: ";

  const p2 = document.createElement("p");
  p2.setAttribute("class", "info-weather");
  p2.innerHTML = `High: ${max_temp}°C, Low: ${min_temp}°C`;

  const p3 = document.createElement("p");
  p3.setAttribute("class", "info-weather");
  p3.innerHTML = weather_description;

  // append paragraphs to trip_card_info_weather
  trip_card_info_weather.appendChild(p1);
  trip_card_info_weather.appendChild(p2);
  trip_card_info_weather.appendChild(p3);
};

// --------------------------------------------------------------------------------
// 1.3) function createTripButtons: creates trip buttons for card
// --------------------------------------------------------------------------------
export const createTripButtons = (trip_card, unique_identifier) => {
  console.log("6.3) create trip-buttons");

  // create div for trip-buttons
  const trip_card_buttons = document.createElement("div");
  trip_card_buttons.setAttribute("class", "trip-card-buttons");

  // 1.3.1) create div 'Add lodging info' that holds a button and a textarea
  const div_add_lodging_info = document.createElement("div");
  div_add_lodging_info.setAttribute("class", "div-button");

  // create button 'add-lodging-info'
  const btn_add_lodging_info = document.createElement("button");
  btn_add_lodging_info.setAttribute("type", "button");
  btn_add_lodging_info.setAttribute(
    "id",
    `btn-add-lodging-info-${unique_identifier}`
  );
  btn_add_lodging_info.textContent = "Add lodging info";

  // create textarea 'add-lodging-info'
  const textArea_add_lodging_info = document.createElement("textarea");
  textArea_add_lodging_info.setAttribute(
    "id",
    `textarea-add-lodging-info-${unique_identifier}`
  );
  textArea_add_lodging_info.rows = 5;
  textArea_add_lodging_info.maxLength = 500;
  textArea_add_lodging_info.placeholder = "Enter lodging information";
  textArea_add_lodging_info.style.display = "none";

  div_add_lodging_info.appendChild(btn_add_lodging_info);
  div_add_lodging_info.appendChild(textArea_add_lodging_info);

  // 1.3.2) create div 'Add packing list' that holds a button and a textarea
  const div_add_packing_list = document.createElement("div");
  div_add_packing_list.setAttribute("class", "div-button");

  // create button 'add-packing-list'
  const btn_add_packing_list = document.createElement("button");
  btn_add_packing_list.setAttribute("type", "button");
  btn_add_packing_list.setAttribute(
    "id",
    `btn-add-packing-list-${unique_identifier}`
  );
  btn_add_packing_list.textContent = "Add packing list";

  // create textarea 'add-packing-list'
  const textArea_add_packing_list = document.createElement("textarea");
  textArea_add_packing_list.setAttribute(
    "id",
    `textarea-add-packing-list-${unique_identifier}`
  );
  textArea_add_packing_list.rows = 5;
  textArea_add_packing_list.maxLength = 500;
  textArea_add_packing_list.placeholder = "List packing stuff";
  textArea_add_packing_list.style.display = "none";

  div_add_packing_list.appendChild(btn_add_packing_list);
  div_add_packing_list.appendChild(textArea_add_packing_list);

  // 1.3.3) create div 'Add notes' that holds a button and a textarea
  const div_add_notes = document.createElement("div");
  div_add_notes.setAttribute("class", "div-button");

  // create button 'add-notes'
  const btn_add_notes = document.createElement("button");
  btn_add_notes.setAttribute("type", "button");
  btn_add_notes.setAttribute("id", `btn-add-notes-${unique_identifier}`);
  btn_add_notes.textContent = "Add notes";

  // create textarea 'add-notes'
  const textArea_add_notes = document.createElement("textarea");
  textArea_add_notes.setAttribute(
    "id",
    `textarea-add-notes-${unique_identifier}`
  );
  textArea_add_notes.rows = 5;
  textArea_add_notes.maxLength = 500;
  textArea_add_notes.placeholder = "Add personal notes";
  textArea_add_notes.style.display = "none";

  div_add_notes.appendChild(btn_add_notes);
  div_add_notes.appendChild(textArea_add_notes);

  // 1.3.4) create div 'Remove trip' that holds a button
  const div_remove_trip = document.createElement("div");
  div_remove_trip.setAttribute("class", "div-button");

  // create button 'Remove trip'
  const btn_remove_trip = document.createElement("button");
  btn_remove_trip.setAttribute("type", "button");
  btn_remove_trip.setAttribute("id", `btn-remove-trip-${unique_identifier}`);
  btn_remove_trip.textContent = "Remove trip";

  div_remove_trip.appendChild(btn_remove_trip);

  // append buttons to trip_card_buttons
  trip_card_buttons.appendChild(div_add_lodging_info);
  trip_card_buttons.appendChild(div_add_packing_list);
  trip_card_buttons.appendChild(div_add_notes);
  trip_card_buttons.appendChild(div_remove_trip);

  trip_card.appendChild(trip_card_buttons);
};

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
