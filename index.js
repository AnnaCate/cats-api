require('dotenv').config()
const express = require('express')
const app = express()
const catsDatabase = require('./data/cats.json')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send('Welcome to all the cats. Meow.')
})

// get cats & allow for query on breeds, using req.query
app.get('/cats', (req, res) => {
  res
    .status(200)
    .send(
      catsDatabase.filter(
        req.query.breed
          ? item => item.type === 'cat' && item.breed === req.query.breed
          : item => item.type === 'cat'
      )
    )
})

// get cat by id using req.params
app.get('/cats/:catId', (req, res) => {
  res.status(200).send(catsDatabase.find(item => item.id === req.params.catId))
})

// get breeds & allow for query on id, using req.query
app.get('/breeds', (req, res) => {
  res
    .status(200)
    .send(
      catsDatabase.filter(
        req.query.id
          ? item => item.type === 'breed' && item.id === req.query.id
          : item => item.type === 'breed'
      )
    )
})

// get breed by id using req.params
app.get('/breeds/:breedId', (req, res) => {
  res
    .status(200)
    .send(catsDatabase.find(item => item.id === req.params.breedId))
})

app.listen(process.env.PORT || 5555, process.env.HOST || '127.0.0.1', () => {
  console.log("I'm up and listening on http://127.0.0.1:5555")
})

console.log(`The host name is: ${process.env.HOST}`)
