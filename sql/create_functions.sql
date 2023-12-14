create or replace function vue3_learning.verify_account
(
	_account_token uuid
)
returns table
(	
	account_id bigint,
	login varchar(50)
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.account_id,
	a.login
from vue3_learning.accounts as a
where a.account_token = _account_token;
end $$;

create or replace function vue3_learning.get_account_token
(
	_login varchar(25),
	_password varchar(64)	
)
returns table
(	
	account_token uuid
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.account_token
from vue3_learning.accounts as a
where a.login = _login
	and a.password_hash = _password;
end $$;

create or replace function vue3_learning.get_account
(
	_account_id bigint
)
returns table
(	
	login varchar(25),
	my_money bigint
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.login,
	a.my_money
from vue3_learning.accounts as a
where a.account_id = _account_id;
end $$;

create or replace function vue3_learning.get_auction
(
	_account_id bigint,
	_limit smallint,
	_offset smallint
)
returns table
(
	lot_id bigint,
	price bigint,
	quantity bigint,
	bid_step bigint,
	current_bid bigint,
	date_start timestamp(0),
	date_end timestamp(0),
	is_faved boolean,
	item jsonb
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.lot_id,
	a.price,
	a.quantity,
	a.bid_step,
	a.current_bid,
	a.date_start,
	a.date_end,
	f.lot_id is not null as is_faved,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item
from vue3_learning.auction as a
	join vue3_learning.items as i
		on i.item_id = a.item_id
	left join vue3_learning.favorites as f
		on f.account_id = _account_id
			and f.lot_id = a.lot_id
where _account_id is null
	or ( a.highest_bidder <> _account_id and a.lot_owner <> _account_id )
limit _limit offset _offset;
		
end $$;

create or replace function vue3_learning.get_bids
(
	_account_id bigint,
	_limit smallint,
	_offset smallint
)
returns table
(
	lot_id bigint,
	price bigint,
	quantity bigint,
	bid_step bigint,
	current_bid bigint,
	date_start timestamp(0),
	date_end timestamp(0),
	is_faved boolean,
	item jsonb
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.lot_id,
	a.price,
	a.quantity,
	a.bid_step,
	a.current_bid,
	a.date_start,
	a.date_end,
	f.lot_id is not null as is_faved,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item
from vue3_learning.auction as a
	join vue3_learning.items as i
		on i.item_id = a.item_id
	left join vue3_learning.favorites as f
		on f.account_id = _account_id
			and f.lot_id = a.lot_id
where a.highest_bidder = _account_id
limit _limit offset _offset;
		
end $$;

create or replace function vue3_learning.get_lots
(
	_account_id bigint,
	_limit smallint,
	_offset smallint
)
returns table
(
	lot_id bigint,
	price bigint,
	quantity bigint,
	bid_step bigint,
	current_bid bigint,
	date_start timestamp(0),
	date_end timestamp(0),
	is_faved boolean,
	item jsonb
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.lot_id,
	a.price,
	a.quantity,
	a.bid_step,
	a.current_bid,
	a.date_start,
	a.date_end,
	f.lot_id is not null as is_faved,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item
from vue3_learning.auction as a
	join vue3_learning.items as i
		on i.item_id = a.item_id
	left join vue3_learning.favorites as f
		on f.account_id = _account_id
			and f.lot_id = a.lot_id
where a.lot_owner = _account_id
limit _limit offset _offset;
		
end $$;

create or replace function vue3_learning.get_storage
(
	_account_id bigint,
	_limit smallint,
	_offset smallint
)
returns table
(
	quantity bigint,
	item jsonb
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	s.quantity,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item
from vue3_learning.storage as s
	join vue3_learning.items i
		on s.item_id = i.item_id
where s.account_id = _account_id
limit _limit offset _offset;
end $$;

create or replace function vue3_learning.get_production
(
	_account_id bigint,
	_limit smallint,
	_offset smallint
)
returns table
(
	production_id bigint,
	process boolean,
	progress smallint,
	title varchar(50),
	materials jsonb,
	step smallint,
	speed smallint,
	quantity bigint,
	item jsonb
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	p.production_id,
	p.process,
	p.progress,
	r.title,
	r.materials,
	r.step,
	r.speed,
	r.quantity,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item
from vue3_learning.production as p
	join vue3_learning.recipes as r
		on p.recipe_id = r.recipe_id
	join vue3_learning.items as i
		on i.item_id = r.item_id
where p.account_id = _account_id
limit _limit offset _offset;
end $$;

create or replace function vue3_learning.get_production
(
	_account_id bigint,
	_production_id bigint
)
returns table
(
	progress smallint,
	step smallint,
	speed smallint,
	item_id bigint,
	quantity bigint
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	p.progress,
	r.step,
	r.speed,
	r.item_id,
	r.quantity
from vue3_learning.production as p
	join vue3_learning.recipes as r
		on p.recipe_id = r.recipe_id
where p.production_id = _production_id
	and p.account_id = _account_id;
end $$;

create or replace function vue3_learning.get_favs
(
	_account_id bigint,
	_limit smallint,
	_offset smallint
)
returns table
(
	lot_id bigint,
	price bigint,
	quantity bigint,
	bid_step bigint,
	current_bid bigint,
	date_start timestamp(0),
	date_end timestamp(0),
	item jsonb
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.lot_id,
	a.price,
	a.quantity,
	a.bid_step,
	a.current_bid,
	a.date_start,
	a.date_end,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item
from vue3_learning.favorites as f
	join vue3_learning.auction as a
		on a.lot_id = f.lot_id
	join vue3_learning.items as i
		on i.item_id = a.item_id			
where f.account_id = _account_id
	and f.lot_id is not null
limit _limit offset _offset;
end $$;

create or replace function vue3_learning.get_auction_log
(
	_account_id bigint
)
returns table
(
	auction_log_id bigint,
	item jsonb,
	money_spent bigint,
	deal_type char(1),
	deal_date timestamp(0)
)
language plpgsql
security definer												-- ??
as $$
begin
return query
select
	a.auction_log_id,
	jsonb_build_object('item_id', i.item_id, 'title', i.title) as item,
	a.money_spent,
	a.deal_type,
	a.deal_date
from vue3_learning.auction_log as a
	join vue3_learning.items as i
		on i.item_id = a.item_id
where a.account_id = _account_id;
end $$;