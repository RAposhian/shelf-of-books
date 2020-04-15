select ROUND(AVG(rating))
from collection_items
where book_id = $1
and rating != 0;