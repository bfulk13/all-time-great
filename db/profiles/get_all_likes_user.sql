select u.uid, sum(likes)
from Questions q
join Users u on u.uid = q.owner_id
where u.uid = $1
group by u.uid