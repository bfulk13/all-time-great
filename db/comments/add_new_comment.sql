insert into Comments (Comments, owner_id, q_id, date, user_avatar, user_username)
values ( $1, $2, $3, $4, $5, $6)
returning *