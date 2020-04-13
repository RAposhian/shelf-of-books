insert into user_collection (
   user_id
) values (
   $1
)
returning collection_id;