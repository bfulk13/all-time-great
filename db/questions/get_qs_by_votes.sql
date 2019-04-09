SELECT *
FROM questions q
JOIN answer a
ON q.QID = a.q_id
ORDER BY a.vote DESC