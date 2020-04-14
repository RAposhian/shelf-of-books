update table collection_items
set rating = $1
where book_id = $2
and where collection_id = $3;