insert into books (
   name,
   genre,
   image
) values (
   ${name},
   ${genre},
   ${image}
)
returning book_id;

