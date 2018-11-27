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

const User_preferences = sequelize.define('user_preferences',{
    id_user: Sequelize.STRING,
    gen_preferat: Sequelize.STRING,
    autor_preferat: Sequelize.STRING
});

const Reviews = sequelize.define('reviews',{
    id_user: Sequelize.STRING,
    id_carte: Sequelize.STRING,
    recenzie: Sequelize.STRING
})

const Best_seller = sequelize.define('best_sellers',{
    id_autor: Sequelize.STRING,
    id_best_seller: Sequelize.STRING,
    nume_best_seller: Sequelize.STRING
})

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})




app.get('/best_sellers', (request, response) => {
    Best_seller.findAll().then((best_sellers)=>{
        response.status(200).json(best_sellers)
    })
})

app.post('/best_sellers', (request, response) => {
    Best_seller.create(request.body).then((best_sellers)=>{
        response.status(201).json(best_sellers)
    })
})



app.listen(8080)