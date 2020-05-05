const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'foodometer.cirzv0ojbs7b.eu-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Techreturners',
  database: 'FD',
});
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post('/foodometer', (request, response) => {
  const data = request.body;
  if (data.username && data.password) {
    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [data.username, data.password], (error, results) => {
      if (error) {
        response.send({
          code: 400,
          failed: 'error ocurred',
          error,
        });
      } else {
        if (results.length > 0) {
          response.send('Login Successful');
        } else {
          response.send('Incorrect Username and/or Password!');
        }
        response.end();
      }
    });
  }
});

module.exports.app = serverless(app);
