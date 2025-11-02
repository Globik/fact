 -- source /home/globi/apikon/sql/usergold.sql
-- source /root/apikon/sql/usergold.sql

drop table if exists usergold cascade;
CREATE TABLE IF NOT EXISTS usergold(
usid MEDIUMINT NOT NULL,
nick VARCHAR (20) NOT NULL,
tgid BIGINT NOT NULL,
photo varchar(50) not null,
lang varchar(3) not null
);



/*
update_id":693967683,
"pre_checkout_query":
{"id":"3811952545119842175",
"from":{"id":887539364,"is_bot":false,"first_name":"Alik","username":"Globik2","language_code":"ru"},
"currency":"XTR","total_amount":1,
"invoice_payload":"fotolink=693967669-3076.jpg&usid=3076"}
*/
