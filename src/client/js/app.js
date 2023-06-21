/* Global Variables */

const generate = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const content = document.querySelector('#content')
const apiBaseURL = 'http://localhost:3000'


export const plan = async () => {
    console.log("Come here")
    fetchGeoCordinates('Mumbai')
    .then( (data) => {
        console.log("Fnal data",data)
        
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





