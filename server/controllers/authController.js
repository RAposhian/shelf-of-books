module.exports = {
   register: (req, res) => {
      const db = req.app.get('db');
      
   },
   login: (req, res) => {
      const db = req.app.get('db');

   },
   logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
   }
}