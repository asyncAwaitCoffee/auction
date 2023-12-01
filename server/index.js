import express from "express"
import cors from 'cors'
import { DB } from "./db.js"
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser'
import { authCheck } from "./middleware.js";
import { serialize, parse } from "cookie";

import dotenv from "dotenv";
dotenv.config()

const app = express()
const port = 443

app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}))
app.use(cookieParser('cookieSecret'))
app.use(express.json());

app.all('*', authCheck)

app.get('/signup', async (req, res) => {

  try {
    const { login, password } = req.query
    const { account_token } = await DB.queryRow('call vue3_learning.auth_sign_up($1, $2, null)', login, password)
  
    //res.cookie("test", account_token, {httpOnly: true, maxAge: 4 * 60 * 60 * 1000, sameSite: "none", secure: true })
    res.send({ok: true, candy: account_token})

  } catch(error) {
    console.error(error)
    res.send({ error: 'signup error!' })

  }
})

app.get('/signin', async (req, res) => {
  try {
    const { login, password } = req.query
    const { account_token } = await DB.queryRow('select * from vue3_learning.get_account_token($1, $2)', login, password)
  
    //res.cookie("test", account_token, {httpOnly: true, maxAge: 4 * 60 * 60 * 1000 })
    res.send({ok: true, candy: account_token})

  } catch(error) {
    console.error(error)
    res.send({ error: 'signin error!' })

  }
})

app.get('/signout', async (req, res) => {
  //res.cookie("test", '', {httpOnly: true, maxAge: 1 })
  res.send({ok: true})

})

app.post('/account', async (req, res) => {
    const account_id = res.locals.account_id
    const result = await DB.queryRow('select * from vue3_learning.get_account($1)', account_id)
    res.send(result)
})

app.post('/auction', async (req, res) => {
    const account_id = res.locals.account_id
    const { limit, offset } = req.query

    const result = await DB.queryRows('select * from vue3_learning.get_auction($1, $2, $3)', account_id, limit, offset)
    res.send({result})
})

app.post('/bids', async (req, res) => {
    const account_id = res.locals.account_id
    const { limit, offset } = req.query

    const result = await DB.queryRows('select * from vue3_learning.get_bids($1, $2, $3)', account_id, limit, offset)
    res.send({result})
})

app.post('/lots', async (req, res) => {
    const account_id = res.locals.account_id
    const { limit, offset } = req.query

    const result = await DB.queryRows('select * from vue3_learning.get_lots($1, $2, $3)', account_id, limit, offset)
    res.send({result})
})

app.post('/favs', async (req, res) => {
    const account_id = res.locals.account_id
    const { limit, offset } = req.query

    const result = await DB.queryRows('select * from vue3_learning.get_favs($1, $2, $3)', account_id, limit, offset)
    res.send({result})
})

app.post('/auction/bid', async (req, res) => {
    const account_id = res.locals.account_id
    const { lot_id } = req.query
    
    const { money_left, last_bid, prev_bid, prev_bidder } = await DB.queryRow('call vue3_learning.bid_auction_lot($1, $2, null, null, null, null);', account_id, lot_id)

    if (!last_bid) {
      res.send({ error: { money_left, last_bid, prev_bid, prev_bidder } })
      return
    }
    const prev_bidder_socket_id = connections.get(parseInt(prev_bidder))
    if (prev_bidder_socket_id) {
      io.to(prev_bidder_socket_id).emit('bid_refund', JSON.stringify({ lot_id, prev_bid }))
    }

    io.emit("bid_refresh", JSON.stringify({ lot_id, last_bid }))

    res.send({ ok: true, money_left })
})

app.post('/auction/buy', async (req, res) => {
    const account_id = res.locals.account_id
    const { lot_id } = req.query
    
    const { lot_owner, my_money, owner_money } = await DB.queryRow('call vue3_learning.buy_auction_lot($1, $2, null, null, null);', account_id, lot_id)

    const prev_bidder_socket_id = connections.get(parseInt(lot_owner))
    if (prev_bidder_socket_id) {
      io.to(prev_bidder_socket_id).emit('lot_sold', JSON.stringify({ owner_money }))
    }

    io.emit("lot_remove", JSON.stringify({ lot_id }))

    res.send(my_money)
})

app.post('/auction/sell', async (req, res) => {
    const account_id = res.locals.account_id
    const { item_id, price, bid_step, quantity } = req.query
    const { lot_id, need_to_del } = await DB.queryRow('call vue3_learning.sell_auction_lot($1, $2, $3, $4, $5, null, null);', account_id, item_id, price, bid_step, quantity)

    io.emit("lot_new", JSON.stringify({ lot_id }))
    res.send({lot_id, need_to_del})
})

app.post('/auction/cancel', async (req, res) => {
    const account_id = res.locals.account_id
    const { lot_id } = req.query
    const need_to_del = await DB.queryRow('call vue3_learning.cancel_auction_lot($1, $2, null);', account_id, lot_id)

    io.emit("lot_remove", JSON.stringify({ lot_id }))

    res.send(need_to_del)
})

app.post('/auction/fav', async (req, res) => {
    const account_id = res.locals.account_id
    const { lot_id } = req.query
    const need_to_del = await DB.queryRow('call vue3_learning.add_item_to_fav($1, $2, null);', account_id, lot_id)

    res.send(need_to_del)
})

app.post('/storage', async (req, res) => {
    const account_id = res.locals.account_id
    const { limit, offset } = req.query

    const result = await DB.queryRows('select * from vue3_learning.get_storage($1, $2, $3)', account_id, limit, offset)
    res.send({result})
})

app.post('/production', async (req, res) => {
    const account_id = res.locals.account_id
    const { limit, offset } = req.query

    const result = await DB.queryRows('select * from vue3_learning.get_production($1, $2, $3)', account_id, limit, offset)
    res.send({result})
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  },
  /*
  allowRequest: async (req, callback) => {
    let data
    if (req.headers.cookie) {
      const cookies = parse(req.headers.cookie)
      const account_token = cookies.test  
      data = await DB.queryRow('select account_id, login from vue3_learning.verify_account($1)', account_token)
    }

    req.account_data = data

    callback(null, data != null);
  }
  */
});

//maps account's id and socket's id
const connections = new Map()

io.on('connection', async (socket) => {
  //console.log('a user connected');
  if (!socket.handshake.auth?.token) {
    socket.disconnect(true)
    return
  }    

  const data = await DB.queryRow('select account_id, login from vue3_learning.verify_account($1)', socket.handshake.auth.token)

  if (!data) {
    socket.disconnect(true)
    return
  }

  const { account_id } = data

  //const { account_id } = socket.request.account_data

  connections.set(parseInt(account_id), socket.id)

  //crafting queue
  const work = new Map()

  socket.on('craft_start', async (production_id) => {
    
    const { progress, step, speed, item_id } = await DB.queryRow('select * from vue3_learning.get_production($1, $2);', account_id, production_id)

    const timer = (100 - progress) / step * speed

    const crafting = setTimeout(async ()=> {
      await DB.queryRow('call vue3_learning.complete_craft($1, $2);', account_id, production_id)
      socket.emit('crafted', JSON.stringify(({ production_id, item_id })))
    }, timer)

    work.set(production_id, crafting)

  });

  socket.on('craft_abort', async (production_id) => {
    let limit = 10
    const wait = setInterval(() => {
      if (work.has(production_id)) {
        clearTimeout(work.get(production_id))
        socket.emit('craft_aborted', JSON.stringify({ production_id }))
        clearInterval(wait)
        return
      }
      if (--limit < 0) {        
        socket.emit('craft_aborted_limit', JSON.stringify({ production_id })) //TODO: event handling
        clearInterval(wait)
      }      
    }, 500)
  });

  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });
});