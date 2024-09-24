const aedes = require('aedes')();
const net = require('net');
const port = 1883; // Port for MQTT broker

// Create a non-TLS MQTT server
const server = net.createServer(aedes.handle);

// Log client connections
aedes.on('client', (client) => {
    console.log(`Client connected: ${client.id}`);
});

// Log subscriptions
aedes.on('subscribe', (subscriptions, client) => {
    console.log(`Client ${client.id} subscribed to topics: ${subscriptions.map(s => s.topic).join(', ')}`);
});

// Log published messages
aedes.on('publish', (packet, client) => {
    if (client) {
        console.log(`Message from client ${client.id} on topic ${packet.topic}: ${packet.payload.toString()}`);
    } else {
        console.log(`Message from broker on topic ${packet.topic}: ${packet.payload.toString()}`);
    }
});

// Publish chart data periodically
function publishChartData() {
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

    aedes.publish({ topic: 'chart/data', payload: JSON.stringify(chartData) });
}

// Start the MQTT broker and publish data every 10 seconds
server.listen(port, () => {
    console.log(`MQTT broker running on port ${port}`);
    setInterval(publishChartData, 10000); // Publish chart data every 10 seconds
});
