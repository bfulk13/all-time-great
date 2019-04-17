//// IMPORTS ////
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser')

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session)
const AWS = require('aws-sdk');

//// CONTROLLERS ////
const ac = require('./controllers/auth_controller');
const qc = require('./controllers/questions/question_controller');
const pc = require('./controllers/profiles/profile_controller');
const ansc = require('./controllers/answers/answers_controller');

//// ENV ////
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRECT_ACCES_KEY,
    region: process.env.AWS_REGION
})
// console.log({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secrectAccessKey: process.env.AWS_SECRECT_ACCES_KEY,
//     region: process.env.AWS_REGION
// })

//// MIDDLEWARE ////
const app = express();

const S3 = new AWS.S3();

const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

// app.use(express.json());

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

app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true}))

//// AMAZON S3 ENDPOINT ////
app.post('/api/s3', (req, res) => {
    const photo = req.body
    const file = photo.file.replace(/^data:image\/\w+;base64,/,'')
    const buf = new Buffer.from(file, 'base64')
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Body: buf,
        Key: photo.filename,
        ConentType: photo.filetype,
        ACL: 'public-read'
    }

    S3.upload(params, (err, data) => {
        console.log(11111, params, err)
        let response, code;
        if (err) {
            response = err;
            code = 500;
        } else {
            response = data;
            code = 200
        }
        res.status(code).send(response)
    })
},
)

//// AUTH ENDPOINTS ////
app.get('/api/current', ac.getUser);
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);


//// QUESTIONS ENDPOINTS ////
app.get('/api/questions', qc.getQsByVotes);
app.get('/api/question/:id', qc.getQ);
app.get('/api/getallquestions', qc.getAllQs);
app.get('/api/getuservotes', qc.getUserVotes);
app.post('/api/addnewquestion', qc.addNewQ);
app.post('/api/searchforquestions', qc.searchBarQuestions);


//// PROFILES ENDPOINTS ////
app.get('/api/profiles', pc.getPsByLikes);
app.get('/api/profile', pc.getProfile)
app.get('/api/viewprofile/:id', pc.viewProfile)


//// ANSWERS ENDPOINTS ////
app.get('/api/getanswersforquestion/:id', ansc.getAnswers);
app.post('/api/sendselectedanswer', ansc.incrementAnswer);
app.post('/api/getanswerresults', ansc.getAnswerResults);
app.post('/api/ifVoted', ansc.canVote)
