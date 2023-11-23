const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('noDeviceFound/index')
})

router.post('/', (req, res) => {
    res.send('value')
})

module.exports = router