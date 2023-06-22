/* Global Variables */
import {getDays} from './helper'
const content = document.querySelector('#content')
const apiBaseURL = 'http://localhost:3000'


export const plan = async () => {
    const destinationCity = document.querySelector('#input-destination').value
    const startDate = document.querySelector("#input-start-date").value
    const endDate = document.querySelector('#input-end-date').value

   
    const diffDays = getDays(startDate,endDate)

    const geoData  = await fetchGeoCordinates(destinationCity)
    const coordinates = geoData.geonames[0]

    const forecastData = await fetchForecast(diffDays,coordinates.lat,coordinates.lng)

    const imageUrl = await fetchImage(destinationCity)
    debugger
    const obj = {
        city:destinationCity,
        imageUrl: imageUrl,
        diffDays: diffDays,
        temp: forecastData.temperature,
        description: forecastData.description,
        countryName: coordinates.countryName
    }
    await updateUI(obj)
    
}


const fetchGeoCordinates = async (location) => {

    const url = `${apiBaseURL}/geoNames`;
    const response = await fetch(`${url}?destination=${location}`)
   
    try {
        const data = await response.json()
        console.log("resSSSSSS", data)
        return data
    }
    catch(err){
        console.log("Error",err)
    }
}

const fetchForecast = async (days, lat, lng) => {
    const url = `${apiBaseURL}/forecast`;
  
    const response = await fetch(`${url}?days=${days}&lat=${lat}&lon=${lng}`)
   
    try {
        const data = await response.json()
       
        return data
    }
    catch(err){
        console.log("Error",err)
    }

}

const fetchImage = async (city) => {
    const apiKey = '37685063-6f00dae4135d76e834728903c'
    const url = `https://pixabay.com/api/?key=${apiKey}&category=places&q=${city}&image_type=photo&pretty=true`

    const response = await fetch(url)
   
    try {
        const data = await response.json()
        const img = data['hits'][0]["webformatURL"]
        return img
    }
    catch(err){
        console.log("Error",err)
    }

}

const updateUI = async (data) => {
    document.getElementById('img').setAttribute('src', data.imageUrl);
    document.getElementById('result-div').innerHTML = `<p>${data.city}, ${data.countryName} is ${data.diffDays} days away.</p><p>Typical weather for then is: <br> Temperature: ${data.temp} <br> ${data.description}</p>`
}





