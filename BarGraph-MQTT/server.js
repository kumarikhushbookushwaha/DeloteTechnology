const express = require('express');
const path = require('path');
const mqtt = require('mqtt');
const app = express();
const port = 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static('public'));

// MQTT setup
const mqttClient = mqtt.connect('mqtt://localhost:1883'); // Connect to MQTT broker

// Log when connected to MQTT broker
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to a topic
    mqttClient.subscribe('test/topic', (err) => {
        if (!err) {
            console.log('Subscribed to test/topic');
        }
    });

    // Publish a message to the topic
    mqttClient.publish('test/topic', 'Hello from server.js!');
});

// Log received messages
mqttClient.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

// API to return chart data (unrelated to MQTT but part of your app)
app.get('/api/chart-data', (req, res) => {
    const chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    res.json(chartData);
});

// Render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
