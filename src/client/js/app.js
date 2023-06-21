/* Global Variables */
const apikey = '&appid=393dc5e8600ff83768f34b5c3ec0f499&units=imperial'
const generate = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const content = document.querySelector('#content')
const apiBaseURL = 'http://localhost:3000'


// Personal API Key for OpenWeatherMap API


const url =  'https://api.openweathermap.org/data/2.5/weather?zip='

// Event listener to add function to existing HTML DOM element

generate.addEventListener('click', ()=>{
    console.log("Gone")
    
    process(url)
})

/* Function called by event listener */

const onGenerate = () => {
   
    
}

/* Function to GET Web API Data*/

const process = async (url) => {
    const newURL = `${url}${zip.value}${apikey}`;
    fetchWeatherData(newURL)
    .then( (data) => {
        postData(`${apiBaseURL}/add`,data)
        .then( (data) => {
            fetchUpdatedData(`${apiBaseURL}/getProjectData`)
            .then( (data) => {
                updateUI(data)
            })
        })
        
    })
   
}

export const fetchWeatherData = async (newURL) => {
    
    const res = await fetch(newURL)
    try {
        const data = await res.json()
        return data

    }
    catch(err){
        console.log(err)
    }
}
 



/* Function to POST data */

const postData = async (url = '', data) => {
    const temp = data['main'].temp
    let d = new Date();
    const newdate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    let feeling = document.getElementById('feelings').value;
    let postObj = {
        temperature: temp,
        date: newdate,
        feeling: feeling
    }

    const result = await fetch (url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
    });
    try{
        const response = await result.json();
        return response;
    } catch(err){
        console.error(err);
    }
}

/* Function to GET Project Data */

const fetchUpdatedData = async (url) => {
    const data = await fetch(url);
    try {
        const response = await data.json();
        return response;
    } catch(err){
        console.error(err);
    }
};

const updateUI = (data) => {
    console.log("Asd",data)
    document.querySelector("#entryHolder").style.display = "block";
    date.innerHTML = data.date;
    temp.innerHTML = data.temperature;
    content.innerHTML = data.feeling ? data.feeling: "No Feelings?";
}
