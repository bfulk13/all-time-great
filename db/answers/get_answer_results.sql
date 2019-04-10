select a.vote, a.aid, a.answer
from Answers a
join questions q 
on a.q_id = q.qid
where q_id = ${qid};

