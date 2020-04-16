require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
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
app.post('/api/register', authCtrl.register);
app.post(`/api/login`, authCtrl.login);
app.get(`/api/logout`, authCtrl.logout);
app.get(`/api/user`, authCtrl.getUser);

//book list endpoints
app.get(`/api/books`, mainCtrl.getAllBooks);
app.get(`/api/rating/:id`, mainCtrl.averageRating);
app.get(`/api/book/:id`, mainCtrl.getSingleBook);

//collection endpoints
app.get(`/api/collection/:id`, mainCtrl.getCollection);
app.post(`/api/collection-book`, mainCtrl.addBook);
app.delete(`/api/collection/:id`, mainCtrl.removeBook);
app.put('/api/rating', mainCtrl.updateRating);