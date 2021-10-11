const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors());
// logging all api calls
app.use("*", (req, res, next) => { 
  console.log(req.url); 
  next();
})
 
const file = require('./products-dataset.json')
app.get('/', function (req, res) {
    // console.log("/ called");
    // accepting filter for sku and priceRange
    let result = file, {query} = req;
    if(query.sku)
      result = result.filter(e => e.sku == query.sku);
    if(query.priceFrom && query.priceTo)
      result = result.filter(e => e.price >= query.priceFrom && e.price <= query.priceTo);
    res.status(200).json(result);
})

app.get('/:id', function (req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
        // console after this will run if not returned.
        return res.status(400).send("INVALID")
    }
    console.log(`/${id} called`);
    const data = file.filter(i => {
        return i.id === Number(id)
    })[0];
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(404).send("NOT_FOUND")
    }
})
 
app.listen(5000, () => {
  console.log("App listening on http://localhost:5000");
})