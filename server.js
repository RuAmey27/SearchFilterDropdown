// server.js
const express = require('express');  //backend application 
const mongoose = require('mongoose');  //to connect the mongodb database
const cors = require('cors');           // to allow the cross origin resource sharing 

const app = express();              // made an object of express to to use
const port = 3000;

// Middleware                   
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dropdown_module', { useNewUrlParser: true, useUnifiedTopology: true });     // to connect the mongodb database

// Define a schema and model
const Schema = mongoose.Schema;
const MyModelSchema = new Schema({
  Name: String,
});
const MyModel = mongoose.model('MyModel', MyModelSchema);

// Endpoint to fetch data
app.get('/api/column-data', async (req, res) => {                           //defining the api endpoint to display the data 
  try {
    const data = await MyModel.find({}, 'Name');                //taking outputof the query to object data 
    res.json(data);                                             //converting the data into the json format & returning as the response
  } catch (error) {
    res.status(500).send(error);
  }
});


// Add this to server.js to insert sample data
app.get('/api/add-sample-data', async (req, res) => {
    try {
      const sampleData = [
        { Name: 'Amey' },
        { Name: 'Aditya' },
        { Name: 'Vaishnavi' },
        { Name: 'Monika' },
      ];
      await MyModel.insertMany(sampleData);
      res.send('Sample data added');
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
