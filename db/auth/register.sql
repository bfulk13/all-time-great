INSERT INTO users (email, username, password, avatar)
VALUES (${email}, ${username}, ${password})
RETURNING id, username, avatar