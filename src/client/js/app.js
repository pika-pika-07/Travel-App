/* Global Variables */

const content = document.querySelector('#content')
const apiBaseURL = 'http://localhost:3000'


export const plan = async () => {
    const destinationCity = document.querySelector('#input-destination').value
    const startDate = document.querySelector("#input-start-date").value
    const endDate = document.querySelector('#input-end-date').value

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");

    fetchGeoCordinates(destinationCity)
    .then( (data) => {
        console.log("Fnal data",data)
        const coordinates = data.geonames[0]
        fetchForecast(diffDays,coordinates.lat,coordinates.lng)
        
    }) 
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
    let url = ''
    const apiKey = '6b3ab930b62a4c22a37463f203c85c3a'
    if(days < 7){
        url = 'https://api.weatherbit.io/v2.0/current'
    }
    else{
        url = 'https://api.weatherbit.io/v2.0/forecast/daily'
    }
    const response = await fetch(`${url}?lat=${lat}&lon=${lng}&key=${apiKey}`)
   
    try {
        const data = await response.json()
        console.log("New res", data)
        
        return data
    }
    catch(err){
        console.log("Error",err)
    }

}





