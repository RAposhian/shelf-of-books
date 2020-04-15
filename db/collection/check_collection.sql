select book_id
from collection_items
where book_id = $1
and collection_id = $2;