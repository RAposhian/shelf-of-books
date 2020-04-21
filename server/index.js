require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      bookCtrl = require('./controllers/bookController'),
      collCtrl = require('./controllers/collectionController'),
      profileCtrl = require('./controllers/profileController'),
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
app.get(`/api/books`, bookCtrl.getAllBooks);
app.get(`/api/rating/:id`, bookCtrl.averageRating);
app.get(`/api/book/:id`, bookCtrl.getSingleBook);
app.post(`/api/book`, bookCtrl.addingBook);

//collection endpoints
app.get(`/api/collection/:id`, collCtrl.getCollection);
app.post(`/api/collection-book`, collCtrl.addBook);
app.delete(`/api/collection/:id`, collCtrl.removeBook);
app.put('/api/rating', collCtrl.updateRating);

//profile endpoints
app.post(`/api/username`, profileCtrl.updateUsername);
app.get(`/api/username`, profileCtrl.checkUsername);
app.post(`/api/profilepicture`, profileCtrl.updatePicture);