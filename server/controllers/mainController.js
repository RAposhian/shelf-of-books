module.exports = {
   getAllBooks: (req, res) => {
      const db = req.app.get('db');

      db.book.get_all_books()
      .then(books => res.status(200).send(books))
      .catch(err => res.status(500).send(err))
   },
   getCollection: (req, res) => {
      const db = req.app.get('db');
      const {id} = req.params;

      db.collection.get_collection(+id)
      .then(collection => res.status(200).send(collection))
      .catch(err => res.status(500).send(err))
   },
   addBook: (req, res) => {
      const db = req.app.get('db');
      const {collection_id, book_id} = req.body;

      db.collection.add_book(+collection_id, +book_id)
      .then(()=> res.sendStatus(200))
      .catch(err => res.status(500).send(err))
   }
}