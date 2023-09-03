require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  host: process.env.DB_HOST,
  database: 'railway',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 7470,
})

// validation functions

const UserNameExists = async (username) => {

    try {
        const result = await pool.query(`SELECT * FROM t_users WHERE username='${username}'`)
        return result.rows.length > 0
    } catch(error) {
        return error
    }
   
}

const EmailExists = async (email) => {

    try {
        const result = await pool.query(`SELECT * FROM t_users WHERE email='${email}'`)
        return result.rows.length > 0
    } catch(error) {
        return error
    }
    
}



const getUsers = (req, res) => {
    pool.query('SELECT * FROM t_users ORDER by userid ASC', (error, results) => {
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
}

const addUser = async (req, res) => {
    console.log({user: req.body})

    const user = req.body

    // do input validation before creating record

    if(user.username.length == 0 || user.email.length == 0 || user.password.length == 0){
        res.status(400).json({ error: "some fields are empty" })
        return
    }
    console.log('validating user with username: ' + user.username + ' and email: ' + user.email)

    if(await UserNameExists(user.username)) {
        console.log('username exists already')
        res.status(409).json({ error: "Username exists already"})
        return
    }

    if(await EmailExists(user.email)) {
        console.log('email exists already')
        res.status(409).json({ error: "Email exists already"})
        return
    }

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