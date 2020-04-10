create table users (
    user_id serial primary key,
    username varchar(100) not null,
    password varchar(300) not null,
    image text
);

create table books (
    book_id serial primary key,
    name varchar(150) not null,
    genre varchar(100),
    image text
);

create table author (
    author_id serial primary key,
    name varchar(100)
);

create table book_authors (
    book_id int references books(book_id),
    author_id int references author(author_id)
);

create table user_collection (
    collection_id serial primary key,
    user_id int references users(user_id),
    book_id int references books(book_id),
    rating integer not null
);