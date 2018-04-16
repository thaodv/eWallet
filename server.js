const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Content-Type",'application/json');
    next();
});

app.post('/api/login', (req, res) => {
    let { loginEmail, loginPassword} = req.body;
    jwt.sign({
        name: "krishna",
        email: req.body.loginEmail,
        id: 1
    }, "ewallet", { }, (err, token) => {
        if(!err) {
            res.status(200).send({
                token
            })
        } else {

        }
    });  
});

app.listen(8080,(err, result) => {
    console.log("Server is running on port 8080");
})
