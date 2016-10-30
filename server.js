'use strict'

const pg = require('pg')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const conString = 'postgresql://sjschmidt@localhost:5432'

app.get('/api/users', (req, res) => {
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query('SELECT * FROM users', (err, result) => {
      if(err) console.error('error running query', err)
      res.send(result)
      client.end()
    })
  })
})

app.all('/api/users/add', (req, res) => {
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query(
      'INSERT INTO users (name, age, sex) VALUES($1, $2, $3)',
      [req.query.name, req.query.age, req.query.sex],
      err => {
        if(err) console.error('error running query', err)
        client.end()
      })
  })
  res.redirect('/')
})

app.all('/api/users/update', (req, res) => {
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query(
      'UPDATE users SET name = $1, age = $2, sex = $3 WHERE id = $4',
      [req.query.name, req.query.age, req.query.sex, req.query.id],
      err => {
        if(err) console.error('error running query', err)
        client.end()
      })
  })
  res.redirect('/')
})

app.get('/api/users/delete', (req, res) => {
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)
    client.query('DELETE FROM users WHERE id=' + req.query.id, (err) => {
      if(err) console.error('error running query', err)
      client.end()
    })
  })
  res.redirect('/')
})

app.get('/', (req, res) => {
  const client = new pg.Client(conString)

  client.connect(function(err) {
    if(err) console.error('could not connect to postgres', err)

    client.query(
      'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name TEXT NOT NULL, age INT NOT NULL, sex TEXT NOT NULL)',
      err => {
        if(err) console.error('error running query', err)
        client.end()
      })
  })
  res.sendFile(__dirname + '/public/index.html')
})

app.use(express.static(__dirname + "/public"))

app.listen(port, () => console.log(`Server listening on port ${port}`))
