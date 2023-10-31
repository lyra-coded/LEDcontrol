// Tutorial used: https://www.youtube.com/watch?v=qj2oDkvc4dQ&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM&index=5

var http = require('http');
const { express } = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

app.set('view engine', 'ejs')
app.set('views', __dirname +_'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

var readData = "";

// listen for serail data
const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600
})
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (serialdata) => {
    console.log(serialdata);
    readData = serialdata;
});

// run server
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(readData);
}).listen(4000);