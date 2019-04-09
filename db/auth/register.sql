INSERT INTO users (email, username, password, avatar)
VALUES (${email}, ${username}, ${password}, ${avatar})
RETURNING id, username, avatar