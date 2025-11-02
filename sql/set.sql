-- source /home/globi/apikon/sql/set.sql
-- source /root/apikon/sql/set.sql
-- sudo mysql -u root -p
-- use roulet


CREATE TABLE IF NOT EXISTS sets(
stun varchar(1000)
);

/*
insert into sets(stun) value('{"stun2": "stun:stun.relay.metered.ca:80", "turn5": "turn:relay1.expressturn.com:3478","username2":"efZIKNPZ0Y17GFG3WZ",
"credential2":"HIYNupkIAHFXSgW8", "turn1":"turn:a.relay.metered.ca:80","username1":"33c88ed716afa1a802b5116a","credential1":"YlI1/qfkEWya3Q4p",
"turn2":"turn:a.relay.metered.ca:80?transport=tcp","turn3": "turn:a.relay.metered.ca:443",
"turn4":"turn:a.relay.metered.ca:443?transport=tcp"}');
*/
/*

 var iceServers = {"iceServers": [ 
	  {
        urls: 'stun:stun.l.google.com:19302'
      },
      { urls: 'turn:relay1.expressturn.com:3478', username: 'efZIKNPZ0Y17GFG3WZ', credential: 'HIYNupkIAHFXSgW8'},
 { urls: "stun:stun.relay.metered.ca:80"},
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }
  ]};
  */
alter table sets add column testshopid MEDIUMINT;
alter table sets add column testshopsecret varchar(50);
alter table sets add column istestHeart boolean default true;

alter table sets add column yoomoney_client_id varchar(1000) not null default 'fuck id';
alter table sets add column yoomoney_secret varchar(2000) not null default 'fuck secret';
alter table sets add column yoomoney_token varchar(2000) not null default 'token';
alter table sets add column y_notif varchar(100) not null default 'yoomoney notif secret';
--alter table sets drop column testshopid;
--alter table sets drop column testshopsecret;
--if exists(select testshopid from sets) update sets set testshopid=3346,testshopsecret='suka' else insert into sets(testshopid,testshopsecret) value(333,'fuck');
--update sets set testshopid=334,testshopsecret='suka';
