-- source /home/globi/apikon/sql/testPurchase.sql
-- source /root/apikon/sql/testPurchase.sql

drop table if exists testPurchase;
CREATE TABLE IF NOT EXISTS testPurchase(
id varchar(50) NOT NULL,
status varchar(30) NOT NULL,
nick varchar(30),
userid MEDIUMINT NOT NULL,
amount decimal(16,2) not null,
dcount int not null,
created_at TIMESTAMP not null default current_timestamp,
updated_at TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
paid boolean not null default 1,
UNIQUE (id)
);
/*
insert into testPurchase(id,status,nick,userid,amount,dcount,created_at) values('44444ddffgr5','pending','dima','5','10.00',9,STR_TO_DATE('2024-05-10T12:01:28.271Z', '%Y-%m-%dT%H:%i:%s.%f'));
2024-05-10T12:01:28.271Z
"2013-07-18 13:44:22.123456"
*/
