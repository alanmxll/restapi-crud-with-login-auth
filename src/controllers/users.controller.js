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

const createUser = async (req, response) => {
    const hashedPassword = await encrypter(req.body.password)

    pool.query(`INSERT INTO users(name, password) VALUES ('${req.body.username}','${hashedPassword}');`)
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


const authUser = async (request, response) => {
    var username = request.body.username;
    var password = request.body.password;

    const hashedPassword = await encrypter(password)
    pool.query(`SELECT name, password FROM users WHERE name='${username}' AND password='${hashedPassword}'`)
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
                    "token": userToken
                });
                console.log(userToken);
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