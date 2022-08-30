CREATE DATABASE authtodolist;
-- NOTE: For uuid funcs to work, run 'CREATE EXTENSION "uuid-ossp";' in psql
CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Add User Data
INSERT INTO "users" (user_name, user_email, user_password) VALUES ('Henry', 'Henry@gmail.com', 'Pinecone');

-- Add Todo Data
INSERT INTO "todos" (description, user_id) VALUES ('Hello World!', '6907aa44-dd39-4496-a43c-2626412263c1');

-- Select Overlapping Data between each table
SELECT * FROM "users" INNER JOIN "todos" ON users.user_id = todos.user_id;

-- These two are the same
SELECT * FROM "users" INNER JOIN "todos" ON users.user_id = '6907aa44-dd39-4496-a43c-2626412263c1';
SELECT * FROM "users" INNER JOIN "todos" ON users.user_id = todos.user_id WHERE users.user_id = '6907aa44-dd39-4496-a43c-2626412263c1';