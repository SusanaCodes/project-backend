const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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

app.post('/foodometer/register', (req, res) => {
  const data = req.body;

  const query = 'INSERT INTO user (first_name,last_name,email_id,username,password) values (?,?,?,?,?)';
  // eslint-disable-next-line no-sequences
  // eslint-disable-next-line max-len
  connection.query(query, [data.fname, data.lname, data.emailid, data.username, data.password], (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Error in Mysql', err);
      res.status(500).send(err);
    } else {
      // eslint-disable-next-line no-shadow
      connection.query(`SELECT * FROM user WHERE user_id = ${results.insertId}`, (err, results) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('Error in Mysql', err);
          res.status(500).send(err);
        // eslint-disable-next-line brace-style
        }
        // eslint-disable-next-line no-empty
        else {
          res.status(201).send(results[0]);
        }
      });
    }
  });
});
module.exports.app = serverless(app);
