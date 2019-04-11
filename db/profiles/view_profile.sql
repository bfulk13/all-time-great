select u.uid, u.username, u.avatar, u.about, sum(q.likes)
from users u
join questions q
on u.uid = q.owner_id
where u.uid = ${id}
group by u.uid, u.username, u.avatar, u.about;