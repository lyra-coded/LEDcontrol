var http = require('http');
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

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