-- source /home/globi/apikon/sql/processTest.sql
-- source /root/apikon/sql/processTest.sql
DROP TABLE processTest;
CREATE TABLE IF NOT EXISTS processTest(
from_id MEDIUMINT,
from_nick varchar(30),
wieviel int, 
UNIQUE (from_id)
);
 -- insert into processTest(from_id,from_nick,wieviel) values('1','suka',4) ON DUPLICATE KEY UPDATE wieviel=wieviel+1;
