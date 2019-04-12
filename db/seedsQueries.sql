-------------------------------------------------
select count(*)
from voted
where Vuser_id= ${uid} and Vquestion_id = ${qid}
-------------------------------------------------
select a.vote, a.aid, a.answer, a.ans_img
from Answers a
join questions q 
on a.q_id = q.qid
where q_id = ${qid}
order by a.vote desc
-------------------------------------------------
select a.aid, a.q_id, a.answer, a.ans_img 
from Answers a
join Questions q on q.qid = a.q_id
where a.q_id = ${id}
-------------------------------------------------
update Answers 
set vote = vote + 1
where aid = ${aid}
-------------------------------------------------
SELECT count(*)
FROM users
WHERE username = ${username}
-------------------------------------------------
SELECT * FROM users
WHERE username = ${username}
-------------------------------------------------
INSERT INTO users (email, username, password, avatar)
VALUES (${email}, ${username}, ${password}, ${avatar})
RETURNING uid, username, avatar
-------------------------------------------------
SELECT uid, username, avatar, about 
FROM users
WHERE uid = ${uid}
-------------------------------------------------
select u.username, u.avatar, q.owner_id, sum(likes)
from Questions q 
join Users u on u.uid = q.owner_id
group by u.username, u.avatar, q.owner_id
order by sum desc
-------------------------------------------------
select u.uid, u.username, u.avatar, u.about, sum(q.likes)
from users u
join questions q
on u.uid = q.owner_id
where u.uid = ${id}
group by u.uid, u.username, u.avatar, u.about;
-------------------------------------------------
insert into Questions (question, q_img, owner_id, likes)
values ( ${question}, ${q_img}, ${owner_id}, 0 )
-------------------------------------------------
select * from questions
-------------------------------------------------
SELECT *
FROM Questions q
ORDER BY likes DESC
-------------------------------------------------
select *
from Questions
where qid = ${id}