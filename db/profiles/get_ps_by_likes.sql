SELECT u.uid, u.username, u.avatar
FROM users u
JOIN questions q
ON u.UID = q.owner_id
ORDER BY q.likes DESC LIMIT 4