const express = require('express')
const AColorPicker = require('a-color-picker')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')

})

router.post('/', (req, res) => {
    AColorPicker.from('.picker')
    .on('change', (picker, color) => {
    document.body.style.backgroundColor = color;
    });
    res.send('value')
})

module.exports = router