insert into users (id, user_name, user_password, user_role, status) values (1, 'amy', 'passworda', 0, 0);
insert into users (id, user_name, user_password, user_role, status) values (2, 'bob', 'passwordb', 0, 0);
insert into users (id, user_name, user_password, user_role, status) values (3, 'zoe', 'passwordz', 0, 1);
insert into users (id, user_name, user_password, user_role, status) values (4, 'diolam', 'password', 1, 0);

insert into files (id, file_name, user_id, status) values (1, 'atest.txt', 1, 0);
insert into files (id, file_name, user_id, status) values (2, 'ptest.txt', 1, 0);
insert into files (id, file_name, user_id, status) values (3, 'btest.txt', 2, 1);
insert into files (id, file_name, user_id, status) values (4, 'pptest.txt', 1, 0);

insert into shares (id, file_id, user_id, status) values (1, 1, 2, 0);
insert into shares (id, file_id, user_id, status) values (2, 1, 3, 0);
insert into shares (id, file_id, user_id, status) values (3, 2, -1, 0);
insert into shares (id, file_id, user_id, status) values (4, 4, -1, 0);
insert into shares (id, file_id, user_id, status) values (5, 3, -1, 0);

