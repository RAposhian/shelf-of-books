require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./authController'),
      mainCtrl = require('./mainController'),
      {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env,
      app = express(),
      port = SERVER_PORT;

app.use(express.json());

app.use(session({
   resave: false,
   saveUninitialized: true,
   secret: SESSION_SECRET,
   cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 30}
}))

massive({
   connectionString: CONNECTION_STRING,
   ssl: {rejectUnauthorized: false}
})
.then(db => {
   app.set('db', db);
   console.log('DB connected')
   app.listen(port, () => console.log(`Server running on port: ${port}`))
})

//auth endpoints
app.post('/auth/register', authCtrl.register);
app.post(`/auth/login`, authCtrl.login);
app.get(`/auth/logout`, authCtrl.login);

//book list endpoints
app.get(`/api/books`, mainCtrl.getAllBooks);