module.exports = {
   updateUsername: (req, res) => {
      const db = req.app.get('db');
      const {username, newUsername} = req.body;

      db.profile.update_username(newUsername, username)
      .then(user => {
         req.session.user.username = user[0].username
         res.status(200).send(req.session.user)
      })
      .catch(err => res.status(500).send(err))
   },
   checkUsername: (req, res) => {
      const db = req.app.get('db');
      const {username} = req.query;

      db.profile.check_username(username)
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).send(err))
   },
   updatePicture: (req, res) => {
      const db = req.app.get('db');
      const {image, username} = req.body;

      db.profile.update_picture(image, username)
      .then(user => {
         req.session.user.image = user[0].image;
         res.status(200).send(req.session.user)
      })
      .catch(err => res.status(500).send(err))
   }
}