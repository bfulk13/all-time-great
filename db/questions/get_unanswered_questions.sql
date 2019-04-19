select * from questions
where qid not in (
	select vquestion_id from voted where vuser_id = ${uid}
)
