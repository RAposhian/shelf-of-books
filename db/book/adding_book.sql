insert into books (
   name,
   genre,
   image,
   description
) values (
   ${name},
   ${genre},
   ${image},
   ${description}
)
returning book_id;

