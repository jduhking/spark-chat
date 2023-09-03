const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
    )
// functions

app.get('/', (req, res) => {
  res.send('Spark-Chat backend')
})

app.get('/users', db.getUsers)
app.post('/login', db.getUser)
app.post('/users', db.addUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})