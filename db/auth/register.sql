INSERT INTO users (email, username, password, avatar)
VALUES (${email}, ${username}, ${password}, `https://robohash.org${username}`)
RETURNING uid, username, avatar