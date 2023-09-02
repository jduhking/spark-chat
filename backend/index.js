const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
    )

app.get('/', (req, res) => {
  res.send('Spark-Chat backend')
})

app.get('/users', db.getUsers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})