const bcrypt =require('bcryptjs');

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

      let newUser =  await db.auth.register_user({username, password: hash});
      let collection = await db.collection.create_collection(+newUser[0].user_id)
      let sessionUser = {...newUser[0], ...collection[0]};
      req.session.user = sessionUser;
      res.status(201).send(req.session.user)

   },
   login: async (req, res) => {
      const db = req.app.get('db');
      const {username, password} = req.body;
      
      let checkUser = await db.auth.check_user(username);
      if(!checkUser[0]) {
         return res.status(400).send('Username or Password is incorrect')
      }
      
      const authorized = bcrypt.compareSync(password, checkUser[0].password);
      if (!authorized) {
         return res.status(400).send('Username or Password is incorrect')
      }

      delete checkUser[0].password

      req.session.user = checkUser[0]
      res.status(200).send(req.session.user)
   },
   logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
   }
}