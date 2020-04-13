select b.name, b.genre, a.name as author, b.image, b.book_id
from books b
join book_authors ba on ba.book_id = b.book_id
join author a on a.author_id = ba.author_id;