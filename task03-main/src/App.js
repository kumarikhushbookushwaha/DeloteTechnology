import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './App.css';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  // Function to generate random data based on the time frame
  const generateRandomData = (timeFrame) => {
    let labels;
    let dataLength;

    switch (timeFrame) {
      case '3hours':
        labels = ['0', '30', '60', '90', '120', '150', '180'];
        dataLength = 7;
        break;
      case '24hours':
        labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        dataLength = 24;
        break;
      case '7days':
        labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
        dataLength = 7;
        break;
      case '30days':
        labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
        dataLength = 30;
        break;
      default:
        labels = ['0', '10', '20', '30', '40', '50', '60'];
        dataLength = 7;
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Sensor Data',
          data: Array.from({ length: dataLength }, () => Math.floor(Math.random() * 100)),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
      ],
    };
  };

  // Initial state for time frames
  const [timeFrames, setTimeFrames] = useState({
    internet: '3hours',
    motion: '3hours',
    latency: '3hours',
    battery: '3hours',
  });

  // Initial state for graphs
  const [graphs, setGraphs] = useState({
    internet: generateRandomData('3hours'),
    motion: generateRandomData('3hours'),
    latency: generateRandomData('3hours'),
    battery: generateRandomData('3hours'),
  });

  // Effect hook to update graph data when time frames change
  useEffect(() => {
    setGraphs(prevGraphs => ({
      internet: generateRandomData(timeFrames.internet),
      motion: generateRandomData(timeFrames.motion),
      latency: generateRandomData(timeFrames.latency),
      battery: generateRandomData(timeFrames.battery),
    }));
  }, [timeFrames]);

  // Handler for changing time frame
  const handleTimeFrameChange = (graphType, timeFrame) => {
    setTimeFrames(prev => ({ ...prev, [graphType]: timeFrame }));
  };

  return (
    <div className="App">
      <h1>Sensor Data Graphs</h1>
      <h6>Made by Ashmit</h6>

      <div className="grid-container">
        {['internet', 'motion', 'latency', 'battery'].map(graphType => (
          <div key={graphType} className="graph-item">
            <h2>{graphType.charAt(0).toUpperCase() + graphType.slice(1)}  Graph</h2>
            <div className="time-buttons">
              <button onClick={() => handleTimeFrameChange(graphType, '3hours')}>Last 3 Hours</button>
              <button onClick={() => handleTimeFrameChange(graphType, '24hours')}>Last 24 Hours</button>
              <button onClick={() => handleTimeFrameChange(graphType, '7days')}>Last 7 Days</button>
              <button onClick={() => handleTimeFrameChange(graphType, '30days')}>Last 30 Days</button>
            </div>
            <Line data={graphs[graphType]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
