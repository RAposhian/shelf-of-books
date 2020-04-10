module.exports = {
   getAllBooks: (req, res) => {
      const db = req.app.get('db');

      db.book.get_all_books()
      .then(books => res.status(200).send(books))
      .catch(err => res.status(500).send(err))
   }
}