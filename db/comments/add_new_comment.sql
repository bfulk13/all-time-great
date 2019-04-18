insert into Comments (Comments, owner_id, q_id, date)
values ( $1, $2, $3, $4)
returning *