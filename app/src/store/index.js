import { createStore } from "vuex";
import { Item, Lot, Storage, parseIntegers } from "@/scripts";
import { MySocket } from "../socket";

const adress = import.meta.env.VITE_URL

export default createStore({
    state: {
        loc: 'auction',
        money: null,
        auction: new Map(),
        lots: new Map(),
        bids: new Map(),
        favs: new Map(),
        storage: new Map(),
        products: new Map(),

        login: null,

        activeForm: null,
        formData: null,

        socket: null,

        isAccountLoading: true,
        isPageLoading: true,
        pageNumber: 0,
        onlyForceLoad: false,
    },
    mutations: {
        async buyLot(state, lot) {
            if (lot.price > state.money) {
                return
            }
            
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

            this.commit('setMoney', my_money)
            this.commit('removeFromAuction', lot.lot_id)
            this.commit('addItem', lot)
            
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

        async sellLot(state, {item_id, price, bid_step, quantity}) {
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

            const stored = state.storage.get(item_id)
            
            if (need_to_del) {
                state.lots.set(lot_id, new Lot(stored.item, stored.img, stored.text, lot_id, price, bid_step, quantity))
                state.storage.delete(item_id)
                return
            }

            stored.quantity -= quantity
            state.lots.set(lot_id, new Lot(stored.item, stored.img, stored.text, lot_id, price, bid_step, quantity))
        },
        async cancelLot(state, lot) {
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
        },
        async bidLot(state, lot) {
            if (state.bids.has(lot.lot_id) || lot.bid_step > state.money) {
                return
            }

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
            }

            state.money = money_left

            state.auction.delete(lot.lot_id)
            state.bids.set(lot.lot_id, lot)
        
        },
        async favLot(state, lot) {
            const URL = `${adress}/auction/fav?lot_id=${lot.lot_id}`
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
            }

            if (need_to_del) {
                state.favs.delete(lot.lot_id)
            } else {
                state.favs.set(lot.lot_id, lot)
            }
        
        },
        refundBid(state, { lot_id, prev_bid}) {
            console.log('refundBid', lot_id, prev_bid)
            state.auction.set(lot_id, state.bids.get(lot_id))
            state.bids.delete(lot_id)

            state.money += prev_bid
        },
        refreshBid(state, { lot_id, last_bid }) {
            console.log('refreshBid', lot_id, last_bid)
            const lot = state.auction.get(lot_id) || state.bids.get(lot_id)
            lot ? lot.current_bid = last_bid : null
        },
        changeLoc(state, loc) {
            state.loc = loc
        },       
        abortCraft(state, product) {
            state.socket.emit('craft_abort', product.production_id)
        },
        startCraft(state, product) {
            product.process = true
            product.done = false
            product.progress = product.progress || 0
            state.socket.emit('craft_start', product.production_id)
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

        setMoney(state, amount) {
            state.money = amount
        },

        setForm(state, {form, data}) {
            state.activeForm = form
            state.formData = data
        },

        clearForm(state) {
            state.activeForm = null
            state.formData = null
        },

        setLogin(state, login) {
            if (!login) {
                return
            }
            state.login = login
            this.commit('setSocket')
        },

        clearLogin(state) {
            state.login = null
            state.loc = 'auction'
            state.money = null
            state.auction.clear()
            state.lots.clear()
            state.bids.clear()
            state.favs.clear()
            state.storage.clear()
            state.products.clear()

            MySocket.clear()
            state.socket = null
        },

        setSocket(state) {
            if (state.login != null) {
                try {
                    state.socket = MySocket.getSocket();
                } catch(error) {
                    console.error(error)
                    console.log('---new socket---')
                    console.log(adress)
                    console.log('---new socket---')
                }                
            }
        },

        setAccountData(state,  {login, my_money}) {
            state.login = login
            state.money = my_money
        },

        setAuctionLot(state, lot) {
            if (lot.is_faved) {                        
                state.favs.set(lot.lot_id, lot)
            }
            if (lot.is_owner) {
                state.lots.set(lot.lot_id, lot)
                return
            }
            if (lot.is_highest_bidder) {
                state.bids.set(lot.lot_id, lot)
                return
            }
            state.auction.set(lot.lot_id, lot)
        },

        setStorageItem(state, storage) {
            state.storage.set(storage.item.item_id, storage)
        },

        setProductionItem(state, product) {
            state.products.set(product.production_id, product)
            if (product.process) {
                //TODO: launching mutation directly on product doesn't work
                this.commit('startCraft', state.products.get(product.production_id))
            }
        },

        setAccountLoading(state, isLoading) {
            state.isAccountLoading = isLoading
        },

        setPageLoading(state, isLoading) {
            state.isPageLoading = isLoading
        }
    },

    getters: {
        getProduction(state) {
            return (production_id) => state.products.get(production_id)
        },
        
        getItemFromAuction(state) {
            return (lot_id) => state.auction.get(lot_id).item
        },
    },

    actions: {
        async fetchAccountData({ commit }) {
            this.commit('setAccountLoading', true)
            const URL = `${adress}/account`
            try {
                const { login, my_money } = await fetch(URL, {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({candy: localStorage.getItem('candy')}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.text())
                    .then(data => data ? JSON.parse(data, parseIntegers) : {})

                commit('setAccountData', {login, my_money})
            } catch(error) {
                console.log(error)
            }
            this.commit('setAccountLoading', false)
        },
        
        async fetchAuction({ commit }) {
            if (this.state.onlyForceLoad) {
                return
            }
            this.commit('setPageLoading', true)
            const URL = `${adress}/auction?limit=20&offset=${this.state.pageNumber * 20}`            
            const { result } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.text())
                .then(data => data ? JSON.parse(data, parseIntegers) : {})

            result.forEach(
                async lot => {
                    const {thumbnailUrl, title} = await fetch(`https://jsonplaceholder.typicode.com/photos/${lot.item.item_id}`)
                        .then(res => res.text())
                        .then(data => data ? JSON.parse(data, parseIntegers) : {})

                    lot.img = thumbnailUrl
                    lot.text = title.slice(0, 1).toUpperCase() + title.slice(1)
                    commit('setAuctionLot', lot)
                })

            if (result.length) {
                this.state.pageNumber++
            } else {
                this.state.onlyForceLoad = true
            }
            this.commit('setPageLoading', false)

        },

        async fetchStorage({ commit }) {
            const URL = `${adress}/storage`
            const { result } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.text())
                .then(data => data ? JSON.parse(data, parseIntegers) : {})

            result.forEach(
                async storage => {
                    const {thumbnailUrl, title} = await fetch(`https://jsonplaceholder.typicode.com/photos/${storage.item.item_id}`)
                        .then(res => res.text())
                        .then(data => data ? JSON.parse(data, parseIntegers) : {})

                    storage.img = thumbnailUrl
                    storage.text = title.slice(0, 1).toUpperCase() + title.slice(1)
                    commit('setStorageItem', storage)
                })
        },

        async fetchProduction({ commit }) {
            const URL = `${adress}/production`
            const { result } = await fetch(URL, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({candy: localStorage.getItem('candy')}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.text())
                .then(data => data ? JSON.parse(data, parseIntegers) : {})
            
            result.forEach(
                async product => {
                    const {thumbnailUrl, title} = await fetch(`https://jsonplaceholder.typicode.com/photos/${product.item.item_id}`)
                        .then(res => res.text())
                        .then(data => data ? JSON.parse(data, parseIntegers) : {})

                    product.img = thumbnailUrl
                    product.text = title.slice(0, 1).toUpperCase() + title.slice(1)
                    commit('setProductionItem', product)
                })
        },
    }
})