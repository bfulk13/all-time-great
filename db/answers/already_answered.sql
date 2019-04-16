
select count(*)
from voted
where Vuser_id= ${uid} and Vquestion_id = ${qid}