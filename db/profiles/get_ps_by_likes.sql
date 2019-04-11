select u.username, q.owner_id, u.avatar, sum(likes)
from Questions q 
join Users u on u.uid = q.owner_id
group by u.username, q.owner_id, u.avatar
order by sum desc
