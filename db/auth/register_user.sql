insert into users (
   username,
   password,
   image
) values (
   ${username},
   ${password},
   'https://res.cloudinary.com/desyiuzzn/image/upload/v1587158432/refternu/ntiqe8xu9raucashxaqp.png'
)
returning user_id, username