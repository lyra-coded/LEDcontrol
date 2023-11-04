// Tutorial used: https://www.youtube.com/watch?v=qj2oDkvc4dQ&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM&index=5
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

app.set('view engine', 'ejs')
app.set('views', (__dirname + 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

var readData = "";

// listen for serial data
const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600
})

// Handle any errors that occur when opening the serial port
port.on('error', (err) => {
    console.error('Serial port error:', err.message);
});

// Read data from serial device
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (serialdata) => {
    console.log(serialdata);
    readData = serialdata;
});

// run server
app.listen(process.env.PORT || 3000)