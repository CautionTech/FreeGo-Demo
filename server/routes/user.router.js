const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const country = req.body.country;
  const accept_terms =  req.body.accept_terms;
  const image = req.body.image;

  const queryText = `INSERT INTO "user" ("username", "password", "first_name", "last_name", "email", "birthday", "country", "accept_terms", "image")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
  pool
    .query(queryText, [username, password, first_name, last_name, email, birthday, country, accept_terms, image ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.user.id;
  const username = req.body.username;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const country = req.body.country;
  const image = req.body.image;

  const queryText = `
  UPDATE "user" 
  SET
    username = $1,
    first_name = $2,
    last_name = $3,
    email = $4,
    birthday = $5,
    country = $6,
    image = $7
  WHERE id = $8;`;
  
    pool
    .query(queryText, [username, first_name, last_name, email, birthday, country, image, id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User profile put failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
