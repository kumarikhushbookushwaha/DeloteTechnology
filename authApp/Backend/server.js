const express = require('express');
const mongoose = require('mongoose');
const userController = require('../Backend/controller/userController');

const app = express();
const PORT = process.env.PORT || 9992;

// Middleware to parse JSON bodies
app.use(express.json());



async function connectToDatabase() {
  try {
   var flag =  await mongoose.connect("mongodb://localhost:27017/authAppDataBase", {
      serverSelectionTimeoutMS: 50000, // Increase timeout to 30 seconds
      bufferCommands: false, // Disable mongoose buffering
      autoIndex: false
    });
    if(flag)
    console.log("Successfully connected to Db");

    // Define routes after successful connection
    app.post('/login', userController.loginUser);
    app.post('/signup', userController.signUpUser);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to Db:", error);
  }
}

connectToDatabase();

