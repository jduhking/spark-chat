require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  host: process.env.DB_HOST,
  database: 'railway',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 7470,
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM t_users ORDER by userid ASC', (error, results) => {
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
}

const addUser = (req, res) => {
    console.log(req)
    const user = req.body

    pool.query(`INSERT INTO t_users (username, email, password) VALUES ('${user.username}' 
    , '${user.email}', '${user.password}')`, (error, results) => {
    if(error){
        throw error
    }
    
    res.status(200).json({ message: "User successfully created\n" + user})

    })
}

module.exports = {
    getUsers,
    addUser
}