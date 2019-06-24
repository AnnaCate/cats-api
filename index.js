require('dotenv').config()
const express = require('express')
const app = express()
const catsDatabase = require('./data/cats.json')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send('Welcome to all the cats. Meow.')
})

// get cats & allow for query on breeds
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

// get breeds
app.get('/breeds', (req, res) => {
  res.status(200).send(catsDatabase.filter(item => item.type === 'breed'))
})

app.listen(process.env.PORT || 5555, process.env.HOST || '127.0.0.1', () => {
  console.log("I'm up and listening on http://127.0.0.1:5555")
})

console.log(`The host name is: ${process.env.HOST}`)
