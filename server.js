const express = require("express")
const Sequelize = require("sequelize")

const app = express()

// app.use('/', express.static('public'))




const sequelize = new Sequelize('biblioteca', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
});


const Users = sequelize.define('users', {
    id_user: Sequelize.STRING,
    userName: Sequelize.STRING,
    parola: Sequelize.STRING,
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING
});

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})


app.listen(8080)