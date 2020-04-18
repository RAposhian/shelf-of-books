insert into author (
   name
) values (
   ${author}
)
returning author_id;
