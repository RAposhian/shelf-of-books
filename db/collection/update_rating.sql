update collection_items
set rating = $1
where book_id = $2
and collection_id = $3;