select *
from questions
where qid in (
	select question_id from liked where user_id = ${id}
)