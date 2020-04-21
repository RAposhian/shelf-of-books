update users
set image = $1
where username = $2
returning image;