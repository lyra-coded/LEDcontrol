// Tutorial used: https://www.youtube.com/watch?v=qj2oDkvc4dQ&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM&index=5
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// add routers
const indexRouter = require('./routes/index')                   // main page router
const noDeviceFoundRouter = require('./routes/noDeviceFound')
const ledProfilesRouter = require('./routes/ledProfiles') // this may need to be ledProfiles instead of ledProfiles.js

app.set('view engine', 'ejs')
app.set('views', (__dirname + '/views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/noDeviceFound', noDeviceFoundRouter)
app.use('/ledProfiles', ledProfilesRouter)

var readData = "";

// run server
app.listen(process.env.PORT || 3000)