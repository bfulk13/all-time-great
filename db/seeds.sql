CREATE TABLE Users (
    UID Serial primary key,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    avatar text
);  

CREATE TABLE Questions (
    QID Serial primary key,
    Question VARCHAR(254),
    Q_img text,
    Owner_id int 
);

CREATE TABLE Answer (
    AID Serial primary key,
    q_id int,
    Answer VARCHAR(200),
    Vote int,
    Ans_img text
);

CREATE TABLE "session" (
 "sid" varchar NOT NULL COLLATE "default",
   "sess" json NOT NULL,
   "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE Following (
    Fuser_id int,
    Fquestion_id int 
);

CREATE TABLE Voted (
    Vuser_id int,
    Vquestion_id int
);