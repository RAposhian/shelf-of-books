select u.username, u.password, uc.collection_id, u.image 
from users u
join user_collection uc on u.user_id = uc.user_id
where username = $1