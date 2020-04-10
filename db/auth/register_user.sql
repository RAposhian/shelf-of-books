insert into users (
   username,
   password
) values (
   ${username},
   ${password}
)
returning user_id, username