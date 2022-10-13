const express = require('express');
const fs = require('fs');
var cors = require('cors')
const app = express();

app.use(cors())
 
var file = require('./products-dataset.json')
app.get('/', function (req, res) {
    console.log("/ called");
    res.send(200).json(file);
})

app.get('/:id', function (req, res) {
    const id = req.params.id;
    if (isNAN(id)) {
        res.status(400).send("INVALID")
    }
    console.log(`/${id} called`);
    const data = file.filter(i => {
        return i.id === Number(id)
    })[0];
    if (data) {
        res.status(200).json(data)
    } else {
        res.status(404).send("NOT_FOUND")
    }
})


app.get('/inStock', function (req, res) {
    const data = file.filter(i => {
        return i.isOutOfStock === 0
    })[0];
    if (data) {
        res.status(200).json(data)
    } else {
        res.status(404).send("NOT_FOUND")
    }
})
 
app.listen(5000)