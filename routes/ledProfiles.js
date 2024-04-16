const AColorPicker = require('a-color-picker')
const express = require('express')
const router = express.Router()

router.get('/ledProfiles', (req, res) => {
    res.render('ledProfiles/index')

    AColorPicker.from('.picker')
    .on('change', (picker, color) => {

    })
    .on('coloradd', (picker, color) => {
      // color added: color
      // modified palette: picker.palette
    })
    .on('colorremove', (picker, color) => {
      // color removed: color
      // modified palette: picker.palette
    });
})

router.post('/ledProfiles', (req, res) => {
    res.send('value')
})

module.exports = router