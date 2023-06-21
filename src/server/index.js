// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
// Start up an instance of app
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server

const port = 3000
const server = app.listen(port, listening);

 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

//Adding Routes

/* Get route */
const getProjectData = (req,res) => {
    res.send(projectData)
}

const addData = (req,res) => {
    projectData['temperature'] = req.body.temperature
    projectData['date'] = req.body.date
    projectData['feeling'] = req.body.feeling

    res.send(projectData)
   // projectData.push(req.data)
}

const fetchGeoCordinates = async (location) => {
    const baseUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=pika`;
    try{
        const response = await fetch(baseUrl)
        
        const data = response.json()
        console.log("KOjrfkofgdskfjmds",data)
        return data
    }
    catch(err){
        throw err
    }
}
const fetchGeo = async (req,res) => {
    console.log("HHLLLLLL")
    const location = req.body
    console.log("HHLLLLLL",location)
    try {
        const response = await fetchGeoCordinates(location)
        res.send(response)
    }
    catch(err){
        res.send(err)
    }
}


app.get('/getProjectData',getProjectData)

app.get('/geoNames',fetchGeo)



app.post('/add',addData)

