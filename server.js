const express = require('express');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes/api');
var app = express();
const cors = require('cors');
const port = 3000;
mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, "dist")));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors()); 
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


  app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header(
          "Access-Control-Allow-Header",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
      });
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../videoApp/src/app/app.component.html"));
})

app.listen(port, () => {

    console.log("Server running at localhost: " + port);

})