insert into Questions (question, q_img, owner_id, likes)
values ( $1, $2, $3, 0 )

returning *