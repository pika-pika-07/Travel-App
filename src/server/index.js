// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
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

app.get('/getProjectData',getProjectData)



app.post('/add',addData)

