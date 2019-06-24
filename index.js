require('dotenv').config()
const express = require('express')
const app = express()
const catsDatabase = require('./data/cats.json')
const bodyParser = require('body-parser')
const sluggo = require('./lib/sluggo')

// tell express to use on every request this fn that's good at parsing json bodies
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
  res
    .status(200)
    .send(
      catsDatabase.find(
        item => item.type === 'cat' && item.id === req.params.catId
      )
    )
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
    .send(
      catsDatabase.find(
        item => item.type === 'breed' && item.id === req.params.breedId
      )
    )
})

// post new cat
app.post('/cats', (req, res) => {
  const catToAdd = req.body

  catToAdd.type = 'cat'
  catToAdd.id = sluggo(catToAdd.name)
  catsDatabase.push(catToAdd)

  res.status(201).send({id: catToAdd.id, ok: true})
})

// delete a cat
app.delete('/cats/:id', (req, res) => {
  const catToDelete = catsDatabase.findIndex(
    item => item.type === 'cat' && item.id === req.params.id
  )
  if (catToDelete >= 0) {
    catsDatabase.splice(catToDelete, 1)
    res.status(200).send({id: req.params.id, deleted: true})
  } else {
    res.status(405).send({id: req.params.id, deleted: false})
  }
})

app.listen(process.env.PORT || 5555, process.env.HOST || '127.0.0.1', () => {
  console.log("I'm up and listening on http://127.0.0.1:5555")
})

console.log(`The host name is: ${process.env.HOST}`)
