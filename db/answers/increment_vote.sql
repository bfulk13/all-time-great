update Answers 
set vote = vote + 1
where aid = ${aid};

select count(*)
from voted
where Vuser_id= ${uid} and Vquestion_id = ${qid};

