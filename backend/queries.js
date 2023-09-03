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


const getUser = async (req, res) => {

    const user = req.body

    console.log('Attempting to retrieve user')
    console.log({ user: user})

    if(user.username.length == 0 || user.password.length == 0){
        res.status(400).json({ error: "some fields are empty" })
        return
    }

    if(await UserNameExists(user.username) == false) {
        console.log('user does not exist')
        res.status(404).json({ error: "User does not exist"})
        return
    }

    console.log('passed all checks')

    pool.query(`SELECT * FROM t_users WHERE username = '${user.username}' AND password = '${ user.password }'`, (error, results) => {
        if(error){
            console.log(error)
            res.status(500).json({error: "Something went wrong", message: error})
            return
        }
        if(results.rows.length > 0){
            res.status(200).json(results.rows)
            return
        }
        res.status(404).json({error: "User does not exist"})

        
    })
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM t_users ORDER by userid ASC', (error, results) => {
    if(error){
        res.status(404).json({error: "User does not exist"})
        return
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
        res.status(500).json({error: error})
        return
    }
    
    res.status(200).json({ message: "User successfully created\n" + user})

    })
}

module.exports = {
    getUsers,
    getUser,
    addUser
}