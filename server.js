const express = require('express')
const path = require('path')

var app = express()
var port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})


app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.get('/static/css/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `/build/static/css/${req.params.file}`))
})

app.get('/static/js/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `/build/static/js/${req.params.file}`))
})

app.get('/static/media/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `/build/static/media/${req.params.file}`))
})

app.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `/build/${req.params.file}`))
})

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
