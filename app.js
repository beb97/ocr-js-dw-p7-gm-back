const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const db = require("./models/index.js");
const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

// Autoriser les requêtes CORS depuis le backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Pour utiliser du JSON en body
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser());


// Les routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Repertoire statiques
app.use(express.static("public"));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Synchro (création au besoin) des tables de la database.
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database.
// Just use force: true as following code:
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


module.exports = app;