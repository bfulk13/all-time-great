select vote, aid, answer
from Answers
where q_id = ${qid};

select a.aid
from Answers a
join Voted v on a.q_id = v.Vquestion_id
where v.Vquestion_id = ${qid} and v.Vuser_id = ${uid};