//// IMPORTS ////
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session)
const aws = require('aws-sdk');

//// CONTROLLERS ////
const ac = require('./controllers/auth_controller');
const qc = require('./controllers/questions/question_controller');
const pc = require('./controllers/profiles/profile_controller');
const ansc = require('./controllers/answers/answers_controller');

//// ENV ////
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

//// MIDDLEWARE ////
const app = express();

const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

app.use(express.json());

app.use(session({
    store: new pgSession({
        pool: pgPool,
        prunSessionInterval: 60 * 60 * 24
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
    app.listen(SERVER_PORT, () => {
        console.log(`${SERVER_PORT} goats dabbing`)
    })
})

//// AMAZON S3 ENDPOINT ////
app.get('/api/signs3', (req, res) => {

})


//// AUTH ENDPOINTS ////
app.get('/api/current', ac.getUser);
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);


//// QUESTIONS ENDPOINTS ////
app.get('/api/questions', qc.getQsByVotes);
app.get('/api/question/:id', qc.getQ);
app.get('/api/getallquestions', qc.getAllQs);
app.post('/api/addnewquestion', qc.addNewQ);


//// PROFILES ENDPOINTS ////
app.get('/api/profiles', pc.getPsByLikes);
app.get('/api/profile', pc.getProfile)


//// ANSWERS ENDPOINTS ////
app.get('/api/getanswersforquestion/:id', ansc.getAnswers);
app.post('/api/sendselectedanswer', ansc.incrementAnswer);
app.get('/api/getanswerresults', ansc.getAnswerResults);
