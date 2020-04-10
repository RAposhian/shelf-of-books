import bcrypt from 'bcryptjs';

module.exports = {
   register: async (req, res) => {
      const db = req.app.get('db');
      const {username, password} = req.body;

      let checkUser = await db.auth.check_user(username);
      if(checkUser[0]) {
         return res.status(400).send('Username already exists')
      }

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      let newUser =  await db.auth.register_user(username, hash);
      let collection = await db.collection.create_collection(+newUser[0].user_id)
      let sessionUser = {...newUser, ...collection[0]};
      req.session.user = sessionUser;
      res.status(201).send(req.session.user)

   },
   login: (req, res) => {
      const db = req.app.get('db');
      const {username, password} = req.body;
   },
   logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
   }
}