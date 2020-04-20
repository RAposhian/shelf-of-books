-- select * 
-- from collection_items ci
-- join books b on ci.book_id = b.book_id
-- where ci.collection_id = $1;

select  b.name, b.genre, a.name as author, b.image, ci.rating, ci.collection_id, b.book_id
from  books b
join collection_items ci on ci.book_id = b.book_id
join book_authors ba on b.book_id = ba.book_id
join author a on a.author_id = ba.author_id
where collection_id = $1;