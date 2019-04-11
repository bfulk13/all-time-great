select a.aid, a.q_id, a.answer, a.ans_img 
from Answers a
join Questions q on q.qid = a.q_id
where a.q_id = ${id}