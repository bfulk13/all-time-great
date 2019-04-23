select * from questions
where question iLIKE '%' || $1 || '%' 