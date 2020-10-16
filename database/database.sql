 CREATE DATABASE postsapi;

 CREATE TABLE posts(
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     description VARCHAR(500)
 );

 INSERT INTO posts(name, description) VALUES 
 ('Post 1', 'Descripción de post 1'),
 ('Post 2', 'Descripción de post 2');