// app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Ensure the existence of necessary directories and files
const publicDir = path.join(__dirname, 'public');
const devicesFile = path.join(__dirname, 'devices.json');
const logsFile = path.join(__dirname, 'logs.txt');

ensureDirectoryExists(publicDir);
ensureFileExists(devicesFile, '[]'); // Default to an empty array if devices.json doesn't exist
ensureFileExists(logsFile, ''); // Default to an empty string if logs.txt doesn't exist

// Task 2: Device Registration
app.post('/register', (req, res) => {
  const { deviceId, deviceType } = req.body;

  // Validation
  if (!deviceId || !deviceType) {
    return res.status(400).json({ error: 'Both deviceId and deviceType are required.' });
  }

  // Load existing devices from devices.json (Bonus Task)
  const existingDevices = loadDevices();

  // Check if the device already exists
  if (existingDevices.find(device => device.deviceId === deviceId)) {
    return res.status(409).json({ error: 'Device already registered.' });
  }

  // Save new device
  existingDevices.push({ deviceId, deviceType });
  saveDevices(existingDevices);

  // Log the registration
  logData(`Device registered - Device ID: ${deviceId}, Device Type: ${deviceType}`);

  // Respond with status 201 (Created)
  res.status(201).json({ message: 'Device registered successfully.' });
});

// Task 3: Displaying Devices
app.get('/show', (req, res) => {
  const existingDevices = loadDevices();

  // Respond with the list of registered devices
  res.json(existingDevices);
});

// Task 4: Receiving Device Data
app.post('/data', (req, res) => {
  const { deviceId, data } = req.body;

  // Validation
  if (!deviceId || !data) {
    return res.status(400).json({ error: 'Both deviceId and data are required.' });
  }

  // Log the received data with a timestamp
  logData(`Data received from Device ID ${deviceId} - ${data}`);

  // Respond with a confirmation message
  res.json({ message: 'Data received successfully.' });
});

// Task 5: Sending Commands to Devices
app.post('/command', (req, res) => {
  const { deviceId, command } = req.body;

  // Validation
  if (!deviceId || !command) {
    return res.status(400).json({ error: 'Both deviceId and command are required.' });
  }

  // Log the command with a timestamp
  logData(`Command sent to Device ID ${deviceId} - ${command}`);

  // Respond with a confirmation message
  res.json({ message: 'Command sent successfully.' });
});

// Task 6: Logging
function logData(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logsFile, `${timestamp}: ${message}\n`);
}

// Bonus Task: Load existing devices from devices.json
function loadDevices() {
  try {
    const data = fs.readFileSync(devicesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading devices.json: ${error.message}`);
    return [];
  }
}

// Save devices to devices.json
function saveDevices(devices) {
  try {
    fs.writeFileSync(devicesFile, JSON.stringify(devices, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing to devices.json: ${error.message}`);
  }
}

// Ensure the existence of a directory
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

// Ensure the existence of a file with default content
function ensureFileExists(file, defaultContent) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, defaultContent, 'utf8');
  }
}

// Task 1: Setup and Initialization
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
