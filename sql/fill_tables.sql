-----------------------------------------------------------------------	accounts
truncate table vue3_learning.accounts;
alter sequence vue3_learning.accounts_seq restart;

insert into vue3_learning.accounts
	(login, password_hash, my_money)
values
	('qwe1', '123', 10000),
	('qwe2', '123', 10000),
	('test', '123', 10000);

-----------------------------------------------------------------------	items
truncate table vue3_learning.items;
alter sequence vue3_learning.items_seq restart;

insert into vue3_learning.items
	(title)
values
	('Low Quality Rectangle'),('Low Quality Square'),('Low Quality Cube'),
	('Common Rectangle'),('Common Square'),('Common Cube'),
	('Good Rectangle'),('Good Square'),('Good Cube'),
	('Nice Rectangle'),('Nice Square'),('Nice Cube'),
	('Great Rectangle'),('Great Square'),('Great Cube'),
	('Legendary Rectangle'),('Legendary Square'),('Legendary Cube'),
	('Marvelous Rectangle'),('Marvelous Square'),('Marvelous Cube'),
	('Mythical Rectangle'),('Mythical Square'),('Mythical Cube');
	
-----------------------------------------------------------------------	recipes
truncate table vue3_learning.recipes;
alter sequence vue3_learning.recipes_seq restart;

insert into vue3_learning.recipes
	(title, item_id, materials, step, speed, quantity)	--materials { item_id : quantity }
values
	('Recipe: Low Quality Rectangle', 1, '{"100": 5}', 10, 500, 1),
	('Recipe: Low Quality Square', 2, '{"100": 5}', 15, 750, 1),
	('Recipe: Low Quality Cube', 3, '{"100": 5}', 8, 250, 1),
	('Recipe: Common Rectangle', 4, '{"1": 1}', 22, 1000, 2),
	('Recipe: Common Square', 5, '{"2": 1}', 31, 1500, 2),
	('Recipe: Common Cube', 6, '{"3": 1}', 18, 500, 2);
	
-----------------------------------------------------------------------	auction
truncate table vue3_learning.auction;
alter sequence vue3_learning.auction_seq restart;

insert into vue3_learning.auction
	(item_id, price, quantity, bid_step, current_bid, date_start, date_end, lot_owner, highest_bidder)
values
	(1, 100, 1, 15, 15, now(), now()::timestamp + '5 day'::interval, 1, -2),
	(2, 400, 1, 25, 25, now(), now()::timestamp + '1 day'::interval, 1, -2),
	(3, 500, 1, 50, 50, now(), now()::timestamp + '3 day'::interval, 1, -2),
	(4, 520, 1, 20, 20, now(), now()::timestamp + '2 day'::interval, 1, -2),
	(5, 600, 1, 50, 50, now(), now()::timestamp + '4 day'::interval, 1, -2),
	(6, 600, 1, 25, 25, now(), now()::timestamp + '6 day'::interval, 1, -2),
	(7, 100, 1, 15, 15, now(), now()::timestamp + '5 day'::interval, 1, -2),
	(8, 400, 1, 25, 25, now(), now()::timestamp + '1 day'::interval, 1, -2),
	(9, 500, 1, 50, 50, now(), now()::timestamp + '3 day'::interval, 1, -2),
	(10, 520, 1, 20, 20, now(), now()::timestamp + '2 day'::interval, 2, -2),
	(11, 600, 1, 50, 50, now(), now()::timestamp + '4 day'::interval, 2, -2),
	(12, 600, 1, 25, 25, now(), now()::timestamp + '6 day'::interval, 2, -2),
	(13, 100, 1, 15, 15, now(), now()::timestamp + '5 day'::interval, 2, -2),
	(14, 400, 1, 25, 25, now(), now()::timestamp + '1 day'::interval, 2, -2),
	(15, 500, 1, 50, 50, now(), now()::timestamp + '3 day'::interval, 2, -2),
	(16, 520, 1, 20, 20, now(), now()::timestamp + '2 day'::interval, 2, -2),
	(17, 600, 1, 50, 50, now(), now()::timestamp + '4 day'::interval, 2, -2),
	(18, 600, 1, 25, 25, now(), now()::timestamp + '6 day'::interval, 2, -2),
	(19, 100, 1, 15, 15, now(), now()::timestamp + '5 day'::interval, 2, -2),
	(20, 400, 1, 25, 25, now(), now()::timestamp + '1 day'::interval, 2, -2),
	(21, 500, 1, 50, 50, now(), now()::timestamp + '3 day'::interval, 2, -2),
	(22, 520, 1, 20, 20, now(), now()::timestamp + '2 day'::interval, 2, -2),
	(23, 600, 1, 50, 50, now(), now()::timestamp + '4 day'::interval, 2, -2),
	(24, 600, 1, 25, 25, now(), now()::timestamp + '6 day'::interval, 2, -2),	
	(1, 100, 2, 15, 15, now(), now()::timestamp + '5 day'::interval, 2, -2),
	(2, 400, 2, 25, 25, now(), now()::timestamp + '1 day'::interval, 2, -2),
	(3, 500, 2, 50, 50, now(), now()::timestamp + '3 day'::interval, 2, -2),
	(4, 520, 2, 20, 20, now(), now()::timestamp + '2 day'::interval, 2, -2),
	(5, 600, 2, 50, 50, now(), now()::timestamp + '4 day'::interval, 2, -2),
	(6, 600, 2, 25, 25, now(), now()::timestamp + '6 day'::interval, 2, -2),
	(7, 100, 2, 15, 15, now(), now()::timestamp + '5 day'::interval, 2, -2),
	(8, 400, 2, 25, 25, now(), now()::timestamp + '1 day'::interval, 2, -2),
	(9, 500, 2, 50, 50, now(), now()::timestamp + '3 day'::interval, 2, -2),
	(10, 520, 2, 20, 20, now(), now()::timestamp + '2 day'::interval, 1, -2),
	(11, 600, 2, 50, 50, now(), now()::timestamp + '4 day'::interval, 1, -2),
	(12, 600, 2, 25, 25, now(), now()::timestamp + '6 day'::interval, 1, -2),
	(13, 100, 2, 15, 15, now(), now()::timestamp + '5 day'::interval, 1, -2),
	(14, 400, 2, 25, 25, now(), now()::timestamp + '1 day'::interval, 1, -2),
	(15, 500, 2, 50, 50, now(), now()::timestamp + '3 day'::interval, 1, -2),
	(16, 520, 2, 20, 20, now(), now()::timestamp + '2 day'::interval, 1, -2),
	(17, 600, 2, 50, 50, now(), now()::timestamp + '4 day'::interval, 1, -2),
	(18, 600, 2, 25, 25, now(), now()::timestamp + '6 day'::interval, 1, -2),
	(19, 100, 2, 15, 15, now(), now()::timestamp + '5 day'::interval, 1, -2),
	(20, 400, 2, 25, 25, now(), now()::timestamp + '1 day'::interval, 1, -2),
	(21, 500, 2, 50, 50, now(), now()::timestamp + '3 day'::interval, 1, -2),
	(22, 520, 2, 20, 20, now(), now()::timestamp + '2 day'::interval, 1, -2),
	(24, 600, 2, 25, 25, now(), now()::timestamp + '6 day'::interval, 1, -2);
	
-----------------------------------------------------------------------	storage
truncate table vue3_learning.storage;
/*
insert into vue3_learning.storage
	(account_id, item_id, quantity)
values
	(1, 1, 1),
	(1, 3, 2);
*/	
-----------------------------------------------------------------------	production
truncate table vue3_learning.production;
alter sequence vue3_learning.production_seq restart;

insert into vue3_learning.production
	(account_id, recipe_id, process, progress)
values
	(1, 5, false, 0),
	(1, 4, false, 0),
	(1, 6, false, 0),
	(1, 1, false, 0),
	(1, 2, false, 0),
	(1, 3, false, 0),
	(3, 5, false, 0),
	(3, 4, false, 0),
	(3, 6, false, 0),
	(3, 1, false, 0),
	(3, 2, false, 0),
	(3, 3, false, 0);
	
-----------------------------------------------------------------------	favorites
truncate table vue3_learning.favorites;
/*
insert into vue3_learning.favorites
	(account_id, lot_id)
values
	(1, 1);
*/