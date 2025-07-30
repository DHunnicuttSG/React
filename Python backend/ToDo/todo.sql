DROP DATABASE IF EXISTS tododb;
CREATE database tododb;
USE tododb;

DROP TABLE IF EXISTS todo;
CREATE TABLE todo (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  todo varchar(255) NOT NULL,
  note varchar(255) DEFAULT NULL,
  finished tinyint(1) DEFAULT '0'
);

insert into todo(todo, note) values ("Get groceries", "need milk and bread");
insert into todo(todo, note) values ("Do laundry", "Need to wash Jeans");
insert into todo(todo, note) values ("Wash dishes", "need diswasher soap");

-- delete from todo where id = 1; 

-- SET SQL_SAFE_UPDATES = 0;
-- update todo set todo = "Go to post Best Buy", note = "Testing" ;
-- SET SQL_SAFE_UPDATES = 1;


-- SET SQL_SAFE_UPDATES = 0;  -- disable safe updates
-- SET SQL_SAFE_UPDATES = 1;;  -- enable safe updates
