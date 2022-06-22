const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { JsonWebTokenError } = require('jsonwebtoken');
const app = express();

const post = require('./Models/posts');
const student = require('./Models/posts');
const routerPost = require('./Routes/post.js');

// mongoose.connect('mongodb://localhost:27017/apiexample').then(() => {
//     console.log("Connected to database");
// }).catch(() => {
//     console.log("Failed to connect to database");
// });
const port = 8080;
// const protectedRoute = express.Router();
// app.set('key', 'secret');

const old_variable = "Old variable";

// protectedRoute.use((req, res, next) => {
//     const token = req.headers["access-token"];
//     if(token){
//         jwt.verify(token, app.get('key'), (err, decoded) => {
//             if(err){
//                 return res.send({'msg' : 'invalid token'});
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         res.send({'msg' : 'Token not provided'});
//     }
// });

app.use(express.json()); //Outputs are in json with this

app.use(cors());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*"); //Allow every computer/domain to conect to the sv
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS"); //Allow the methods mentioned
    res.header("Access-Control-Allow-Headers","Content-Type"); //requires a header Content-type is required
    
    next();
    
});

// --------------------------- API Routes ------------------------------
app.use('/api', routerPost);

// --------------------------- GET ------------------------------
app.get('/api/get/withouttoken', function (req, res) {
    res.send({
        msg : 'Hello',
        content : 'This is a list of users',
        value: [{
            name: "Fernando Tarango",
            age: "21",
        },
        {
            name: "Brayan Prieto",
            age: "20",
        },{
            name: "Edgar Rivas",
            age: "20",
        },{
            name: "Gabriela Rojas",
            age: "21",
        }, {
            name: "Michell Sosa",
            age: "21",
        },{
            name: "Paulina Torres",
            age: "21",
        }]
    });
});

app.get('/api/get/withtoken', function (req, res) {
    res.send({
        msg : 'Hello',
        content : 'This is a test msg'
    });
});

// --------------------------- POST ------------------------------
app.post('/api/new', function (req, res) {
    let body = req.body;
    res.send({
        msg : 'Hello2',
        content : `This is a test msg printing the title = ${body.title}`
    });
});

// --------------------------- PUT ------------------------------
app.put('/api/edit', function (req, res) {
    let newvar = req.body;
    res.send({
        last_variable: old_variable,
        new_variable: newvar,
    });
});

// --------------------------- DELETE ------------------------------
app.delete('/api/delete', function (req, res) {
    res.send("Delete request called");
});

app.listen(port, function () {
    console.log("API is running");
});