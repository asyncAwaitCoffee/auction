create or replace procedure vue3_learning.auth_sign_up
(
	_login varchar(25),
	_password_hash char(64),
	
	out account_token uuid
)
language plpgsql
security definer												-- ??
as $$
declare _account_id bigint;
begin

	insert into vue3_learning.accounts as a
		(login, password_hash, my_money)
	values
		(_login, _password_hash, 10000)
	returning a.account_token, a.account_id into account_token, _account_id;
	
	insert into vue3_learning.production
	(account_id, recipe_id, process, progress)
	values
	(_account_id, 5, false, 0),
	(_account_id, 4, false, 0),
	(_account_id, 6, false, 0),
	(_account_id, 1, false, 0),
	(_account_id, 2, false, 0),
	(_account_id, 3, false, 0);

end;$$;

create or replace procedure vue3_learning.bid_auction_lot
(
	_account_id bigint,
	_lot_id bigint,

	out money_left bigint,
	out prev_bid bigint,
	out prev_bidder bigint,
	out last_bid bigint,
	out deal_date timestamp(0)
)
language plpgsql
security definer												-- ??
as $$
declare _item_id bigint;
begin

with bid as (
	update vue3_learning.auction as a
		set current_bid = a.current_bid + a.bid_step,
			highest_bidder = _account_id
	from vue3_learning.auction as a_old
	where a.lot_id = _lot_id
		and a.highest_bidder <> _account_id
		and a.lot_id = a_old.lot_id
		--and now() between a.date_start and a.date_end
	returning a.current_bid, a_old.current_bid as prev_bid, a_old.highest_bidder as prev_bidder, a.item_id
),
pay as (
	update vue3_learning.accounts as a
		set my_money = a.my_money - bid.current_bid
	from bid
	where a.account_id = _account_id
		and bid.current_bid is not null
		and a.my_money >= bid.current_bid
	returning a.my_money, bid.current_bid, bid.prev_bid, bid.prev_bidder, bid.item_id
),
prev_refund as (
	update vue3_learning.accounts as a
		set my_money = a.my_money + pay.prev_bid
	from pay
	where a.account_id = pay.prev_bidder
		and pay.prev_bid is not null
)
	select
		pay.my_money, pay.current_bid, pay.prev_bid, pay.prev_bidder, pay.item_id
	into money_left, last_bid, prev_bid, prev_bidder, _item_id
	from pay;
	
	call vue3_learning.log_the_deal(_account_id, _item_id, last_bid, 'b'::char(1), deal_date);
	call vue3_learning.log_the_deal(prev_bidder, _item_id, prev_bid, 'r'::char(1), deal_date);
end;
$$;

create or replace procedure vue3_learning.buy_auction_lot
(
	_account_id bigint,
	_lot_id bigint,

	out my_money bigint,
	out lot_owner bigint,
	out owner_money bigint,
	out deal_date timestamp(0)
)
language plpgsql
security definer												-- ??
as $$
declare _item_id bigint;
declare _quantity bigint;
declare _price bigint;
declare _refunded_money bigint;
declare _highest_bidder bigint;
begin

	if exists
		(
			select * from vue3_learning.auction as a
		 	where a.lot_id = _lot_id
			and a.lot_owner = _account_id
		)
	then return;
	end if;

	with lot as (
		delete
		from vue3_learning.auction as a
		where a.lot_id = _lot_id
		returning 
			a.item_id,
			a.price,
			a.quantity,
			a.current_bid,
			a.highest_bidder,
			a.lot_owner
	),
	pay as (
		update vue3_learning.accounts as a
			set my_money = a.my_money - lot.price
		from lot
		where a.account_id = _account_id
			and a.my_money >= lot.price
		returning a.my_money, lot.price
	),
	income as (
		update vue3_learning.accounts as a
			set my_money = a.my_money + lot.price
		from lot
		where a.account_id = lot.lot_owner
		returning a.my_money as recieved_money
	),
	refund as (
		update vue3_learning.accounts as a
			set my_money = a.my_money + lot.current_bid
		from lot
		where a.account_id = lot.highest_bidder
		returning lot.current_bid as refunded_money
	)
	select
		lot.item_id,
		pay.my_money,
		lot.quantity,
		lot.lot_owner,
		income.recieved_money,
		pay.price,
		lot.highest_bidder,
		refund.refunded_money
	into _item_id, my_money, _quantity, lot_owner, owner_money, _price, _highest_bidder, _refunded_money
	from lot
		left join pay
			on true
		left join income
			on true
		left join refund
			on true;
	
	if _item_id is null or my_money is null
		then raise exception 'buy_auction_lot(%, %)', _account_id, _lot_id;
	end if;
	
	if found then
		call vue3_learning.add_item_to_storage(_account_id, _item_id, _quantity);
	end if;
	
	call vue3_learning.log_the_deal(_account_id, _item_id, _price, 'a'::char(1), deal_date);
	call vue3_learning.log_the_deal(lot_owner, _item_id, _price, 's'::char(1), deal_date);
	call vue3_learning.log_the_deal(_highest_bidder, _item_id, _refunded_money, 'r'::char(1), deal_date);
end;
$$;

create or replace procedure vue3_learning.sell_auction_lot
(
	_account_id bigint,
	_item_id bigint,
	_price bigint,
	_bid_step bigint,
	_quantity bigint,
	
	out lot_id bigint,
	out need_to_del boolean
)
language plpgsql
security definer												-- ??
as $$
begin

	update vue3_learning.storage as s
		set quantity = s.quantity - _quantity
	where s.account_id = _account_id
		and s.item_id = _item_id
		and s.quantity - _quantity >= 0
	returning s.quantity < 1 into need_to_del;

	if found then
		insert into vue3_learning.auction as a
			(item_id, price, quantity, bid_step, current_bid, date_start, date_end, lot_owner, highest_bidder)
		values
			(_item_id, _price, _quantity, _bid_step, 0, now(), now()::timestamp + '10 day'::interval, _account_id, -2)
		returning a.lot_id into lot_id;
	end if;
	
	delete from vue3_learning.storage as s
	where need_to_del
		and s.account_id = _account_id
		and s.item_id = _item_id;
end;
$$;

create or replace procedure vue3_learning.cancel_auction_lot
(
	_account_id bigint,
	_lot_id bigint,
	
	out need_to_del boolean,
	out deal_date timestamp(0)
)
language plpgsql
security definer												-- ??
as $$
declare _item_id bigint;
declare _quantity bigint;
declare _highest_bidder bigint;
declare _refunded_money bigint;
begin
	delete from vue3_learning.auction as a
	where a.lot_id = _lot_id
		and a.lot_owner = _account_id
	returning item_id, quantity, true, highest_bidder, current_bid into _item_id, _quantity, need_to_del, _highest_bidder, _refunded_money;
	
	if found then
		call vue3_learning.add_item_to_storage(_account_id, _item_id, _quantity);
		call vue3_learning.log_the_deal(_highest_bidder, _item_id, _refunded_money, 'r'::char(1), deal_date);
	end if;
end;
$$;

create or replace procedure vue3_learning.complete_craft
(
	_account_id bigint,
	_production_id bigint
)
language plpgsql
security definer												-- ??
as $$
declare _item_id bigint;
declare _quantity bigint;
begin
	update vue3_learning.production as p
		set process = false,
			progress = 0
	from vue3_learning.recipes as r
	where r.recipe_id = p.recipe_id
		and p.production_id = _production_id
	returning r.item_id, r.quantity into _item_id, _quantity;
	
	if found then
		call vue3_learning.add_item_to_storage(_account_id, _item_id, _quantity);
	end if;
end;
$$;

create or replace procedure vue3_learning.add_item_to_storage
(
	_account_id bigint,
	_item_id bigint,
	_quantity bigint
)
language plpgsql
security definer												-- ??
as $$ begin

	insert into vue3_learning.storage as s
		(account_id, item_id, quantity)
	values
		(_account_id, _item_id, 1)
	on conflict (account_id, item_id)
	do update
		set quantity = s.quantity + _quantity
	where s.account_id = _account_id
		and s.item_id = _item_id;
end;
$$;

create or replace procedure vue3_learning.add_item_to_fav
(
	_account_id bigint,
	_lot_id bigint,
	
	out need_to_del boolean
)
language plpgsql
security definer												-- ??
as $$ begin

	perform * from vue3_learning.favorites as f
	where f.account_id = _account_id
		and f.lot_id = _lot_id;
		
	if found then
		delete from vue3_learning.favorites as f
			where f.account_id = _account_id
				and f.lot_id = _lot_id;
				
		select true into need_to_del;
	else
		insert into vue3_learning.favorites as f
			(account_id, lot_id)
		values
			(_account_id, _lot_id);
	end if;
end;
$$;

create or replace procedure vue3_learning.log_the_deal
(
	_account_id bigint,
	_item_id bigint,
	_money_spent bigint,
	_deal_type char(1),
	
	out the_deal_date timestamp(0)
)
language plpgsql
security definer												-- ??
as $$ begin

	if _money_spent is null then return; end if;

	insert into vue3_learning.auction_log
		(account_id, item_id, money_spent, deal_date, deal_type)
	values
		(_account_id, _item_id, _money_spent, now(), _deal_type)
	returning deal_date into the_deal_date;
		
end;
$$;