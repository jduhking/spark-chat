import { Request, Response, NextFunction } from 'express'
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
import LoginData from './models/login'



const login = async (req: Request<LoginData>, res: Response) => {
  
  const {email, password} = req.body

  console.log(`Attempting to login user.. ${email} 
  ${password}`)
  
  const response: Response = await db.login(req.body, res);

  return response
}

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
    )
// functions

app.get('/', (req: Request, res: Response) => {
  res.send('Spark-Chat backend')
})

app.get('/users', db.getUsers)
app.post('/login', login)
app.post('/users', db.addUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
