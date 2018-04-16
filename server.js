const express = require('express');

const app = express();

app.post('/api/login', (req, res) => {
    let { loginEmail, loginPassword} = req.body;
    console.log(req.body);  
});

app.listen(8080,(err, result) => {
    console.log("Server is running on port 8080");
})
