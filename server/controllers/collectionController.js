module.exports = {
   getCollection: (req, res) => {
      const db = req.app.get('db');
      const {id} = req.params;

      db.collection.get_collection(+id)
      .then(collection => res.status(200).send(collection))
      .catch(err => res.status(500).send(err))
   },
   addBook: async(req, res) => {
      const db = req.app.get('db');
      const {collection_id, book_id} = req.body;

      let book = await db.collection.check_collection(+book_id, +collection_id);
      if (book[0]) {
         return res.status(400).send('Book already in collection')
      }

      db.collection.add_book(+collection_id, +book_id)
      .then(()=> res.sendStatus(200))
      .catch(err => res.status(500).send(err))
   },
   removeBook: (req, res) => {
      const db = req.app.get('db')
      const {id} = req.params

      db.collection.remove_book(+id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
   },
   updateRating: (req, res) => {
      const db = req.app.get('db');
      const {ratingInput, book_id, collection_id} = req.body;

      db.collection.update_rating(+ratingInput, book_id, collection_id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
      
   }
}