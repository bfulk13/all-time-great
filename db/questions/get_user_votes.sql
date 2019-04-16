select * from voted v
join users u on v.vuser_id = u.uid
join questions q on v.vquestion_id = q.qid