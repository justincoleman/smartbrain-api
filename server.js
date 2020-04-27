const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors()); 

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'justin',
        password: '',
        database: 'smartbrain'
    }
});

app.get('/', (req, res) => {
    res.status(200).json("Hi");
})

app.post('/signin', signin.handleSignin(db, bcrypt) );
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db) });
app.put('/image', (req, res) => { image.handleImage(req,res,db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req,res) });


app.listen(3003, () => {
    console.log('app is running on port 3003');
});