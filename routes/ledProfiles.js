const AColorPicker = require('a-color-picker')
const express = require('express')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const axios = require('axios')
const router = express.Router()

// port constant for reading from serial device
const serialDevice = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600
})

// allows express to parse http msgs with plain text
router.use(express.text())

// handle post requests
// the route already has /ledProfiles in it!?!?
router.post('/handleColorFromFrontend', (req, res) => {
    console.log("running post handler")
    console.log(req.body)
    serialDevice.write(req.body)
    // res.status(200).send('Color data received: ' + data);
});

// maybe add a button to top right of page to connect to arduino

router.post('/connectToDevice', () => {
    // Read data from serial device

});

// Handle any errors that occur when opening the serial port
serialDevice.on('error', (err) => {
    console.error('Serial port error:', err.message);
});

// when user connects to page
router.get('/', (req, res) => {
    // render page
    res.render('ledProfiles/index')
    // Read data from serial device
    const parser = serialDevice.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data', (serialdata) => {
        console.log(decimalToAscii(serialdata));
        readData = serialdata;
    });
})

router.post('/', (req, res) => {
    res.send('value')
})

// convert dec to ascii from arduino
function decimalToAscii(decimalSeries) {
    return decimalSeries
        .split(',') // split string at delimiter
        .map(num => String.fromCharCode(Number(num))) // Convert each decimal to ASCII
        .join(''); // Join the characters into a string
}
module.exports = router