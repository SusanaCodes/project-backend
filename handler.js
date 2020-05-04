const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "FD",
});
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/foodometer", function(req, res) {
  connection.query("SELECT * FROM task", function (err, data) {
});

app.post("/foodometer",(req,res)=>{
  
})

module.exports.app = serverless(app);
