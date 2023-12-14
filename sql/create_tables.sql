-----------------------------------------------------------------------	accounts
drop table if exists vue3_learning.accounts;
drop sequence if exists vue3_learning.accounts_seq;

create sequence vue3_learning.accounts_seq
as bigint
increment by 1
start with 1
no cycle;

create table vue3_learning.accounts
(
	account_id bigint not null default nextval('vue3_learning.accounts_seq'),
	login varchar(25) unique not null,
	password_hash varchar(64) not null,
	my_money bigint not null default 0,
	account_token uuid not null default gen_random_uuid()
);

create unique index accounts_uix on vue3_learning.accounts
(
	account_id
);
-----------------------------------------------------------------------	items
drop table if exists vue3_learning.items;
drop sequence if exists vue3_learning.items_seq;

create sequence vue3_learning.items_seq
as bigint
increment by 1
start with 1
no cycle;

create table vue3_learning.items
(
	item_id bigint not null default nextval('vue3_learning.items_seq'),
	title varchar(50) not null
);

create unique index items_uix on vue3_learning.items
(
	item_id
);
-----------------------------------------------------------------------	recipes
drop table if exists vue3_learning.recipes;
drop sequence if exists vue3_learning.recipes_seq;

create sequence vue3_learning.recipes_seq
as bigint
increment by 1
start with 1
no cycle;

create table vue3_learning.recipes
(
	recipe_id bigint not null default nextval('vue3_learning.recipes_seq'),
	title varchar(50) not null,
	item_id bigint not null,
	materials jsonb,
	step smallint not null,
	speed smallint not null,
	quantity bigint not null default 1
);

create unique index recipes_uix on vue3_learning.recipes
(
	recipe_id
);
-----------------------------------------------------------------------	auction
drop table if exists vue3_learning.auction;
drop sequence if exists vue3_learning.auction_seq;

create sequence vue3_learning.auction_seq
as bigint
increment by 1
start with 1
no cycle;

create table vue3_learning.auction
(
	lot_id bigint not null default nextval('vue3_learning.auction_seq'),
	item_id bigint not null,
	price bigint,
	quantity bigint,
	bid_step bigint,
	current_bid bigint,
	date_start timestamp(0),
	date_end timestamp(0),
	lot_owner bigint not null,
	highest_bidder bigint
);

create unique index auction_uix on vue3_learning.auction
(
	lot_id
);
-----------------------------------------------------------------------	storage
drop table if exists vue3_learning.storage;

create table vue3_learning.storage
(
	account_id bigint not null,
	item_id bigint not null,
	quantity bigint not null
);

create unique index storage_uix on vue3_learning.storage
(
	account_id, item_id
);
-----------------------------------------------------------------------	production
drop table if exists vue3_learning.production;
drop sequence if exists vue3_learning.production_seq;

create sequence vue3_learning.production_seq
as bigint
increment by 1
start with 1
no cycle;

create table vue3_learning.production
(
	account_id bigint not null,
	production_id bigint not null default nextval('vue3_learning.production_seq'),
	recipe_id bigint not null,
	process boolean default false,
	progress smallint default 0
);

create unique index production_uix on vue3_learning.production
(
	production_id
);
-----------------------------------------------------------------------	favorites
drop table if exists vue3_learning.favorites;

create table vue3_learning.favorites
(
	account_id bigint not null,
	lot_id bigint not null
);

create index favorites_ix on vue3_learning.favorites
(
	account_id
);
-----------------------------------------------------------------------	auction_log
drop table if exists vue3_learning.auction_log;
drop sequence if exists vue3_learning.auction_log_seq;

create sequence vue3_learning.auction_log_seq
as bigint
increment by 1
start with 1
no cycle;

create table vue3_learning.auction_log
(
	auction_log_id bigint not null default nextval('vue3_learning.auction_log_seq'),
	account_id bigint not null,
	item_id bigint not null,
	money_spent bigint not null,
	deal_date timestamp(0),
	deal_type char(1)
);

create index auction_log_ix on vue3_learning.auction_log
(
	account_id
);