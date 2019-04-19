select count(*)
from liked
where user_id= ${uid} and question_id = ${qid}