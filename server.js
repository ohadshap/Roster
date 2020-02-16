const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')

const app = express()

app.use(express.static(path.join(__dirname,  'dist')))
app.use(express.static(path.join(__dirname,  'node_modules')))
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)


const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})

