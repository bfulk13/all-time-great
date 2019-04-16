update Answers 
set vote = vote + 1
where aid = ${aid};

insert into voted (vuser_id, vquestion_id)
values (${uid}, ${qid})


