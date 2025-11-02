-- source /home/globi/apikon/sql/invoice.sql
-- source /root/apikon/sql/invoice.sql

drop table if exists invoice cascade;
CREATE TABLE IF NOT EXISTS invoice(
usid MEDIUMINT NOT NULL,
CONSTRAINT `fk_user2_id`
    FOREIGN KEY (usid) REFERENCES users (id),
crAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
inv varchar(100) not null,
pc varchar(100) not null,
conf int not null default 0);


/*
{
  invoice: 'invPd7zbVPTGJMrXTKPfiYoygJFUUUVGzut69yKrkEvDYtBfBTtYU',
  payment_code: 'PMTvBAidjUHZPn1RxY3y8vM3CPSANXFfaaLcb75gXGTdsTs9TT16W',
  address: '3KuCztELFSgMLCkkT3MYt7bYrPFPXdJq12',
  domain: 'rouletka.ru',
  domain_hash: '9a3d1ff1f6285339f79d6788f4afff1fe3e614ff',
  confirmations: 3,
  callback_link: 'https://rouletka.ru/btccb',
  forwarding_address: 'bc1qjd6sdgd23h9vknhfd2l3gt3elsw3w8v9ngpj5t',
  currency: 'BTC'
}
WHERE creation_date < NOW() - INTERVAL '15' MINUTE;
  insert into invoice(usid,inv,pc) values(5,'inv','fucker');
  select * from invoice WHERE crat < current_timestamp + INTERVAL '1' MINUTE;
  select*from invoice where crAt < interval '1' minute;
  
  select * from invoice WHERE crat < current_timestamp -  INTERVAL '60' MINUTE;     nothing
  select * from invoice WHERE crat < current_timestamp -  INTERVAL '10' MINUTE;

 select * from invoice WHERE crat > current_timestamp +  INTERVAL '6' MINUTE; 
 select * from invoice WHERE crat > current_timestamp -  INTERVAL '6' MINUTE;  vot eto

*/
