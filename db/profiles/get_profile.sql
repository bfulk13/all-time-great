-- select u.uid, u.username, u.avatar, sum(likes)
-- from Questions q
-- join Users u on u.uid = q.owner_id
-- where u.uid = $1
-- group by u.uid, u.username, u.avatar

SELECT uid, username, avatar, about
FROM users
WHERE uid = $1;

