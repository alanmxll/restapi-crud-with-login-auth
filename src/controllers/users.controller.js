const path = require('path');
const crypto = require("crypto");
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'alanmxll',
    password: 'root',
    database: 'firstapi',
    port: '5432',

})

const encrypt = {
    alg: "aes256",
    secret: "chaves",
    type: "hex"
};

function encrypter(password) {
    const cipher = crypto.createCipher(encrypt.alg, encrypt.secret);
    cipher.update(password);
    return cipher.final(encrypt.type);
};

// ----------- USERS -----------//

const loginUser = (request, response) => {
    response.sendFile(path.join(__dirname + '/files/login.html'));
};

const create = (req, res) => {
    res.sendFile(path.join(__dirname + '/files/create_user.html'))
};

const createUser = (req, response) => {
    const hashedPassword = encrypter(req.body.password)
    const {
        username,
        firstname,
        lastname,
        email,
        registration,
        role
    } = req.body;

    pool.query(`INSERT INTO users(username, first_name, last_name, email, registration, role, password) VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${registration}', '${role}', '${hashedPassword}');`)
        .then(response.send("usuario criado"))
};

const allUsers = (req, response) => {
    pool.connect()
        .then(client => {
            return client.query("SELECT * FROM users")
                .then(res => {
                    client.release()
                    response.send(res.rows)
                })
                .catch(e => {
                    client.release()
                    console.log(err.stack)
                })
        })
};


const authUser = (request, response) => {
    var username = request.body.username;
    var password = request.body.password;

    const hashedPassword = encrypter(password)
    pool.query(`SELECT * FROM users WHERE username='${username}' AND password='${hashedPassword}'`)
        .then(res => {
            if (res.rowCount > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                const userToken = jwt.sign({
                    user: username,
                },
                    'sangatibergasa', {
                    expiresIn: "1m"
                });
                response.send({
                    "authentication": true,
                    "token": userToken,
                    "first_name": res.rows[0]["first_name"],
                    "last_name": res.rows[0]["last_name"],
                    "role": res.rows[0]["role"]
                });
                console.log(`token: ${userToken}`);
                console.log(`role: ${res.rows[0]["role"]}`);
            }
            else {
                response.send({ "authentication": false });
            }
            console.log(res.rows)
        })
};

module.exports = {
    loginUser,
    create,
    createUser,
    allUsers,
    authUser,
};