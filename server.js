const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const async = require("async");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Content-Type",'application/json');
    next();
});

app.post('/api/login', (req, res) => {
    let { loginEmail, loginPassword } = req.body;
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
app.post('/api/sendemail',(req, res) => {
    let success_email = [];
    let failure_email = [];
    let emails = req.body.emails;
    async.each(emails, function sendEmail(Email, callback) {
        let status = false;
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "jotunloyalty@gmail.com",
                pass: "loyalty@jotun"
            }
        });
        try {
            async.waterfall([
                function(callback) {                
                    var mailOptions = {
                        from: 'jotunloyalty@gmail.com',     
                        to: Email,
                        subject: 'Test node mail', 
                        html: `
                        <!DOCTYPE html>
                        <html>
                            <head>
                            <style>
                            div.container {
                                width: 100%;
                                border: 1px solid gray;
                            }
                            
                            header, footer {
                                padding: 1em;
                                color: white;
                                background-color: black;
                                clear: left;
                                text-align: center;
                            }
                            
                            nav {
                                float: left;
                                max-width: 160px;
                                margin: 0;
                                padding: 1em;
                            }
                            
                            nav ul {
                                list-style-type: none;
                                padding: 0;
                            }
                            
                            nav ul a {
                                text-decoration: none;
                            }
                            
                            article {
                                margin-left: 170px;
                                border-left: 1px solid gray;
                                padding: 1em;
                                overflow: hidden;
                            }
                            </style>
                            </head>
                            <body>
                            
                            <div class="container">
                            
                            <header>
                            <h1>City Gallery</h1>
                            </header>
                            
                            <nav>
                            <ul>
                                <li><a href="#">London</a></li>
                                <li><a href="#">Paris</a></li>
                                <li><a href="#">Tokyo</a></li>
                            </ul>
                            </nav>
                            
                            <article>
                            <h1>London</h1>
                            <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
                            <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
                            </article>
                            
                            <footer>Copyright &copy; W3Schools.com</footer>
                            
                            </div>
                            
                            </body>
                        </html>`
                    };
                    transporter.sendMail(mailOptions, function(error, info) {               
                        if(error) {
                            console.log(error)
                            failure_email.push(Email);
                        } else {
                            status = true;
                            success_email.push(Email);
                        }
                        callback(null,status,Email);
                    });
                },
                function(statusCode,Email,callback) {
                        console.log("Will update DB here for " + Email + "With " + statusCode);
                        callback();
                }
                ],function(){
                    //When everything is done return back to caller.
                    callback();
            });
        } catch(err) {
            console.log(err);
        }        
    },function(err, result){
        console.log(success_email);
        console.log(failure_email);
        if(err) {
            console.log(err);
        } else {
            res.status(200).send({
                success_email,
                failure_email
            })
        }                
    });    
})

app.listen(8080,(err, result) => {
    console.log("Server is running on port 8080");
})
