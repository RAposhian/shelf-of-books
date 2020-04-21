update users
set username = $1
where username = $2
returning username;