select u.username, u.avatar, q.owner_id, sum(likes)
from Questions q 
join Users u on u.uid = q.owner_id
group by u.username, u.avatar, q.owner_id
order by sum desc
