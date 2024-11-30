const express = require('express')
const router = express.Router()

// This handles loading stuff on the main page
router.get('/', (req, res) => {
    res.render('index')

})

router.post('/', (req, res) => {
    res.send('value')
    // send color data to arduino here
})

module.exports = router