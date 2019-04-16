select count(*)
from voted
where vuser_id= ${uid} and vquestion_id = ${qid}