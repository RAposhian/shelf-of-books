select b.name, a.name as author, ci.rating, b.genre, b.image, b.description
from books b
join collection_items ci on ci.book_id = b.book_id
join book_authors ba on b.book_id = ba.book_id
join author a on a.author_id = ba.author_id
where collection_id = $1
and b.book_id = $2;
