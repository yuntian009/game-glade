"use strict";

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = 'An error occurred on the server. Try again later.';

const multer = require("multer");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

app.get('/featured', async function(req, res) {
  try {
    let db = await getDBConnection();
    let query = await db.all('SELECT title, shortName, description FROM featuredGames');
    await db.close();
    res.json(query);
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.get('/allgames', async function(req, res) {
  try {
    let db = await getDBConnection();
    let query = await db.all('SELECT title, shortName, genre, platform FROM games');
    await db.close();
    res.json(query);
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.get('/detail/:gameShortName', async function(req, res) {
  try {
    let db = await getDBConnection();
    let query = await db.get('SELECT * FROM games WHERE shortName = ?', req.params.gameShortName);
    await db.close();
    res.json(query);
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.get('/detail2/:gameFullName', async function(req, res) {
  try {
    let db = await getDBConnection();
    let query = await db.get('SELECT * FROM games WHERE title = ?', req.params.gameFullName);
    await db.close();
    res.json(query);
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.get('/search', async function(req, res) {
  try {
    let search = req.query.search;
    search = '%' + search + '%';
    const query = "SELECT * FROM games WHERE title LIKE ? OR shortName LIKE ?";
    let db = await getDBConnection();
    let queryResults = await db.all(query, search);
    await db.close();
    res.json(queryResults);
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.post('/signin', async function(req, res) {
  let user = req.body.email;
  let pass = req.body.password;
  try {
    let db = await getDBConnection();
    const query = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    let queryResult = await db.all(query, user, pass);
    await db.close();
    if (queryResult.length > 0) {
      res.json(queryResult);
    } else {
      res.type('text');
      res.status(400);
      res.send("Account or Password doesn't match, please try again");
    }
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.post('/order', async function(req, res) {
  try {
    let uid = req.body.id;
    let game = req.body.product;
    let price = req.body.value;
    let shortName = req.body.sName;
    let db = await getDBConnection();
    let operation = await db.run('INSERT INTO shoppingCart (user_uid, productname, price, shortName) VALUES (?, ?, ?, ?)', uid, game, price, shortName);
    // const query = 'SELECT * FROM shoppingCart WHERE user_uid = ?';
    // let queryResult = await db.all(query, uid);
    await db.close();
    res.type('text');
    res.send('');
  } catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

app.get('/lookup', async function(req, res) {
  try {
    let uid = req.query.uid;
    let db = await getDBConnection();
    const query = 'SELECT * FROM shoppingCart WHERE user_uid = ?';
    let queryResult = await db.all(query, uid);
    await db.close();
    res.json(queryResult);
  }
  catch (err) {
    res.type('text').status(SERVER_ERROR);
    res.send(SERVER_ERROR_MSG);
  }
});

/**
 * Open a connection to the database.
 *
 * @returns {Promise<sqlite.Database>} A Promise that resolves to an instance of sqlite.Database.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
  return db;
}

app.use(express.static('public'));
const localPort = 8000;
const PORT = process.env.PORT || localPort;
app.listen(PORT);