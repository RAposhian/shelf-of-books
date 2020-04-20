module.exports = {
   getAllBooks: (req, res) => {
      const db = req.app.get('db');

      db.book.get_all_books()
      .then(books => res.status(200).send(books))
      .catch(err => res.status(500).send(err))
   },
   
   averageRating: (req, res) => {
      const db = req.app.get('db');
      const {id} = req.params

      db.book.get_average_rating(+id)
      .then(rating => res.status(200).send(rating))
      .catch(err => res.status(500).send(err))
   },
   getSingleBook: (req, res) => {
      const db = req.app.get('db');
      const {id} = req.params;
      const {collection_id} = req.query;

      db.book.get_single_book(+collection_id, id)
      .then(book => res.status(200).send(book))
      .catch(err => res.status(500).send(err))
   },
   addingBook: async(req, res) => {
      const db = req.app.get('db');
      const {name, genre, image, author, description} = req.body;

      let bookId = await db.book.adding_book({name, genre, image, description});
      let authorId = await db.book.adding_author({author});
      
      db.book.connect_book_authors(+bookId[0].book_id, +authorId[0].author_id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
   }
}