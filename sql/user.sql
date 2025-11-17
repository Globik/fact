-- source /home/globi/apikon/sql/user.sql
-- source /root/fact/sql/user.sql

drop table if exists users cascade;
CREATE TABLE IF NOT EXISTS users(
id MEDIUMINT NOT NULL AUTO_INCREMENT,
password VARCHAR (400) NOT NULL,
name varchar(255) NOT NULL,
brole text NOT NULL default 'non',
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY (id),
UNIQUE (name)
);
/*

alter table users drop column theart;
alter table users add column theart int not null default 0;
alter table users add column heart int not null default 0;
alter table users add constraint theartRestriction check(theart > -1);
alter table users add constraint heartRestriction check(heart > -1);
ERROR 4025 (23000): CONSTRAINT `heartRestriction` failed for `roulet`.`users`
alter table users add column prem varchar(1) not null default 'n';
alter table users add column mon bigint;
alter table users add column entr int not null default 0;
alter table users drop column glid;
alter table users add column tgid bigint;
alter table users add column vkid bigint;
alter table users add column glid varchar(30);
100298911806697908635'
alter table users add column zar bigint not null default 0;

DROP INDEX IF EXISTS name ON users; 
delete from users;
ALTER TABLE users AUTO_INCREMENT = 1;
CREATE UNIQUE INDEX VkId ON users(vkid);
CREATE UNIQUE INDEX TgId ON users(tgid);
sudo mysql -u root -p
use roulet
insert into ban(usid,nick,grund) values((?),(?),(?))`, [ usid, nick2, numb ]
insert into ban(usid,nick) select id, name from users where id between 31950 and 32000; 
insert into ban(usid,nick) select id, name from users where id between 31930 and 31940; 
SELECT name,zar FROM users WHERE zar = (SELECT MAX(zar) FROM users);
*/
