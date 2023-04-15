create table if not exists users
(
  id            integer primary key autoincrement,
  user_name     varchar(256)                not null,
  user_password varchar(256)                not null,
  user_role     varchar(256) default 'user' not null,  -- user - normal, admin - administrator
  status        tinyint      default 0      not null,  -- 0 - normal, 1 - deleted
  unique (user_name)
);

create table if not exists files
(
  id            integer primary key autoincrement,
  file_name     varchar(256)                not null,
  user_id       integer                     not null,
  status        tinyint      default 0      not null   -- 0 - normal, 1 - deleted
);

create table if not exists shares
(
  id            integer primary key autoincrement,
  file_id       integer                     not null,
  user_id       integer                     not null,  -- > 0 user, == -1 everyone
  status        tinyint      default 0      not null   -- 0 - normal, 1 - deleted
);
