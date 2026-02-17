-- source /home/globi/fact/sql/chat_messages.sql
-- source /root/fact/sql/chat_messages.sql
-- sudo mysql -u root -p
-- use chatikon
drop table if exists chat_messages cascade;
CREATE TABLE chat_messages (
-- id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    INDEX idx_created_at (created_at)
); 
-- insert into chat_messages(message) values('bla bla');
