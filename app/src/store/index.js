import { createStore } from "vuex";
import { Item, Lot, Storage, parseIntegers } from "@/scripts";

import { adress } from "stores/constants";

import * as actions from "./actions";
import * as getters from "./getters"

import account from "stores/account";
import page from "stores/page";

export default createStore({

    modules: {
        account, page
    },

    actions,
    getters,

    state: {
        auction: new Map(),
        lots: new Map(),
        bids: new Map(),
        favs: new Map(),
        storage: new Map(),
        production: new Map(),
    },
    
    mutations: {

        async buyLot(state, lot) {
            if (lot.price > state.money) {
                return
            }

            lot.done = false
            
            const URL = `${adress}/auction/buy?lot_id=${lot.lot_id}`
            const my_money = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            this.commit('account/setMoney', my_money)
            this.commit('removeFromAuction', lot.lot_id)
            this.commit('addItem', lot)

            lot.done = true
            
        },

        async sellLot(state, {item_id, price, bid_step, quantity}) {
            const stored = state.storage.get(item_id)
            stored.done = false

            const URL = `${adress}/auction/sell?item_id=${item_id}&quantity=${quantity}&price=${price}&bid_step=${bid_step}`
            const { lot_id, need_to_del } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))
         
            stored.done = true
            
            if (need_to_del) {
                state.lots.set(lot_id, new Lot(stored.item, stored.img, stored.text, lot_id, price, bid_step, quantity))
                state.storage.delete(item_id)
                return
            }

            stored.quantity -= quantity
            state.lots.set(lot_id, new Lot(stored.item, stored.img, stored.text, lot_id, price, bid_step, quantity))
        },

        async cancelLot(state, lot) {
            lot.done = false

            const URL = `${adress}/auction/cancel?lot_id=${lot.lot_id}`
            const { need_to_del } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            if (need_to_del) {
                this.commit('addItem', new Storage(lot.item, lot.img, lot.text, lot.quantity))
            }

            lot.done = true
        },

        async bidLot(state, lot) {
            if (state.bids.has(lot.lot_id) || lot.bid_step > state.money) {
                return
            }

            lot.done = false

            const URL = `${adress}/auction/bid?lot_id=${lot.lot_id}`
            const { money_left, error } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            if (error) {
                console.error(`error: ${error}`)
                console.error(error)
            }

            state.account.money = money_left

            state.auction.delete(lot.lot_id)
            state.bids.set(lot.lot_id, lot)

            lot.done = true
        
        },

        async favLot(state, lot) {
            const URL = `${adress}/auction/fav?lot_id=${lot.lot_id}`
            let setted = false

            if (state.favs.has(lot.lot_id)) {
                state.favs.delete(lot.lot_id)
            } else {
                state.favs.set(lot.lot_id, lot)
                setted = true
            }
        
            const { need_to_del, error } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            if (error) {
                console.error(`error: ${error}`)
                setted ? state.favs.delete(lot.lot_id) : state.favs.set(lot.lot_id, lot)
            }
        },

        addItem(state, box) {
            if (state.storage.has(box.item.item_id)) {
                state.storage.get(box.item.item_id).quantity += box.quantity
            } else {
                state.storage.set(box.item.item_id, new Storage(box.item, box.img, box.text, box.quantity))
            }
        },

        removeFromAuction(state, lot_id) {
            state.auction.delete(lot_id)
            state.bids.delete(lot_id)
            state.lots.delete(lot_id)
            state.favs.delete(lot_id)
        },

        refundBid(state, { lot_id, prev_bid}) {
            state.auction.set(lot_id, state.bids.get(lot_id))
            state.bids.delete(lot_id)

            state.money += prev_bid
        },

        refreshBid(state, { lot_id, last_bid }) {
            const lot = state.auction.get(lot_id) || state.bids.get(lot_id) || state.lots.get(lot_id)
            lot ? lot.current_bid = last_bid : null
        },

        abortCraft(state, product) {
            state.account.socket.emit('craft_abort', product.production_id)
        },

        startCraft(state, product) {
            product.process = true
            product.done = false
            product.progress = product.progress || 0

            state.account.socket.emit('craft_start', product.production_id)

            const crafting = setInterval(
                () => {
                    if (!product.process) {
                        product.process = false
                        clearInterval(crafting)
                        return
                    }
                    product.progress += product.step
                    if (product.progress > 99) {
                        clearInterval(crafting)
                        product.process = false
                        product.progress = 0
                    }                                     
                },
                product.speed
            )
        },

        clearAuction(state) {
            state.loc = 'auction'
            state.auction.clear()
            state.lots.clear()
            state.bids.clear()
            state.favs.clear()
            state.storage.clear()
            state.production.clear()
        },

        setAuctionLot(state, lot) {
            lot.done = true
            if (lot.is_faved) {                        
                state.favs.set(lot.lot_id, lot)
            }
            state.auction.set(lot.lot_id, lot)
        },

        setMyBid(state, bid) {
            bid.done = true
            if (bid.is_faved) {                        
                state.favs.set(bid.lot_id, bid)
            }
            state.bids.set(bid.lot_id, bid)
        },

        setMyLot(state, lot) {
            lot.done = true
            if (lot.is_faved) {                        
                state.favs.set(lot.lot_id, lot)
            }
            state.lots.set(lot.lot_id, lot)
        },

        setMyFav(state, lot) {
            lot.done = true
            state.favs.set(lot.lot_id, lot)
        },


        setStorageItem(state, storage) {
            storage.done = true
            state.storage.set(storage.item.item_id, storage)
        },

        setProductionItem(state, product) {
            product.done = true
            state.production.set(product.production_id, product)
            if (product.process) {
                //TODO: launching mutation directly on product doesn't work
                this.commit('startCraft', state.production.get(product.production_id))
            }
        },
    },    
})