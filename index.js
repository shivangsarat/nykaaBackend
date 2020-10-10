const express = require('express');
const fs = require('fs');
var cors = require('cors')
const app = express();

app.use(cors())
 
const file = './products-dataset.json'
app.get('/', function (req, res) {
    console.log("/ called");
    const data = fs.readFile(file, (err, data) => {
        if (err) {
            console.log("error", err);
            res.send(err);
        } else {
            console.log("successfull");
            res.send(data)
        }
    })
//   res.send('Hello World')
})
 
app.listen(5000)