require("./model/mongo");
const express = require('express');
const bodyParser = require('body-parser');
const provinceController = require("./controller/provinceController");
const districtControler = require("./controller/districtController");
const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use("/provinces",provinceController);
app.use("/districts",districtControler);



app.listen(3000);