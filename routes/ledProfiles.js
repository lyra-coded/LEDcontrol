const AColorPicker = require('a-color-picker')
const express = require('express')
const { SerialPort } = require('serialport')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('ledProfiles/index')
})

router.post('/', (req, res) => {
    res.send('value')
})

module.exports = router