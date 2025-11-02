 -- source /home/globi/apikon/sql/ban.sql
-- source /root/chatik/api/sql/ban.sql
-- sudo mysql -u root -p
-- use roulet

drop table if exists ban cascade;
CREATE TABLE IF NOT EXISTS ban(
usid MEDIUMINT NOT NULL,
CONSTRAINT `fk_user_id`
    FOREIGN KEY (usid) REFERENCES users (id),
   -- ON DELETE CASCADE
nick varchar(20) NOT NULL,
grund int not null default 1
);

/*
insert into ban(usid,nick) values(5,'suka1');
select*from ban where ip='23.23.22.35' and usid !=5;
select brole,name,ip,grund from users left join ban on users.id=ban.usid where users.id=5;

*/
