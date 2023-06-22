/* Global Variables */

const content = document.querySelector('#content')
const apiBaseURL = 'http://localhost:3000'


export const plan = async () => {
    const destinationCity = document.querySelector('#input-destination').value
    const startDate = document.querySelector("#input-start-date").value
    const endDate = document.querySelector('#input-end-date').value

    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    
    const diffTime = Math.abs(date2 - date1);
    const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffDays =  diff <= 16 ? diff -1 : 15; 
    

    fetchGeoCordinates(destinationCity)
    .then( (data) => {
        console.log("Fnal data",data)
        const coordinates = data.geonames[0]
        fetchForecast(diffDays,coordinates.lat,coordinates.lng)
        
    }) 
}

function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {month: '2-digit'});
    const day = date.toLocaleString('default', {day: '2-digit'});
  
    return [year, month, day].join('-');
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





