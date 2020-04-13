select * 
from collection_items ci
join books b on ci.book_id = b.book_id
where ci.collection_id = $1;