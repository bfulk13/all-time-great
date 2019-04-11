select a.vote, a.aid, a.answer, a.ans_img
from Answers a
join questions q 
on a.q_id = q.qid
where q_id = ${qid}
order by a.vote desc

