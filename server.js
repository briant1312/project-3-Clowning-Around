const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

// always require and configure near the top
require('dotenv').config()
require('./config/database')

const app = express()

// comes from .env file or use 3001
const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(express.json())

app.use(require('./config/checkToken'))

// configure both the server-favicon and the static middleware
// to server from the production build folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
// telling our express app to use this directory for our static assets
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/comment', require('./routes/api/comment'))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})