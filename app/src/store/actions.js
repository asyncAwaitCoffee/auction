import { parseIntegers } from "../scripts/index"
import { adress } from "./modules/constants";

export const fetchAccountData = async ({ commit, state }) =>
    {
        commit('account/setAccountLoading', true)
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
            commit('account/setAccountData', {login, my_money})
        } catch(error) {
            console.log(error)
        }
        commit('account/setAccountLoading', false)
    }

export const fetchAuction = async ({ commit, state }) =>
    {
        /*
        if (state.page.onlyForceLoad) {
            return
        }
        */
        commit('page/setPageLoading', true)
        const URL = `${adress}/auction?limit=${state.page.loadLimit}&offset=${state.auction.size}`            
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
        if (result.length > state.page.loadLimit) {
            state.page.pageAuction++
        } else {
            state.page.onlyForceLoad = true
        }
        commit('page/setPageLoading', false)
    }

export const fetchBids = async ({ commit, state }) =>
    {
        /*
        if (state.page.onlyForceLoad) {
            return
        }
        */
        commit('page/setPageLoading', true)
        const URL = `${adress}/bids?limit=${state.page.loadLimit}&offset=${state.bids.size}`            
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
            async bid => {
                const {thumbnailUrl, title} = await fetch(`https://jsonplaceholder.typicode.com/photos/${bid.item.item_id}`)
                    .then(res => res.text())
                    .then(data => data ? JSON.parse(data, parseIntegers) : {})
                bid.img = thumbnailUrl
                bid.text = title.slice(0, 1).toUpperCase() + title.slice(1)
                commit('setMyBid', bid)
            })

        if (result.length >= state.page.loadLimit) {
            state.page.pageBids++
        } else {
            state.page.onlyForceLoad = true
        }

        commit('page/setPageLoading', false)
    }

export const fetchLots = async ({ commit, state }) =>
        {
            /*
            if (state.page.onlyForceLoad) {
                return
            }
            */
            commit('page/setPageLoading', true)
            const URL = `${adress}/lots?limit=${state.page.loadLimit}&offset=${state.lots.size}`
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
                    commit('setMyLot', lot)
                })

            if (result.length >= state.page.loadLimit) {
                state.page.pageLots++
            } else {
                state.page.onlyForceLoad = true
            }
    
            commit('page/setPageLoading', false)
        }

export const fetchStorage = async ({ commit, state }) =>
    {
        commit('page/setPageLoading', true)
        const URL = `${adress}/storage?limit=${state.page.loadLimit}&offset=${state.storage.size}`
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
            
        commit('page/setPageLoading', false)
    }

export const fetchProduction = async ({ commit, state }) =>
    {
        commit('page/setPageLoading', true)

        const URL = `${adress}/production?limit=${state.page.loadLimit}&offset=${state.production.size}`
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

        commit('page/setPageLoading', false)
    }

export const fetchFavs = async ({ commit, state }) =>
        {
            /*
            if (state.page.onlyForceLoad) {
                return
            }
            */
            commit('page/setPageLoading', true)
            const URL = `${adress}/favs?limit=${state.page.loadLimit}&offset=${state.favs.size}`            
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
                async fav => {
                    const {thumbnailUrl, title} = await fetch(`https://jsonplaceholder.typicode.com/photos/${fav.item.item_id}`)
                        .then(res => res.text())
                        .then(data => data ? JSON.parse(data, parseIntegers) : {})
                    fav.img = thumbnailUrl
                    fav.text = title.slice(0, 1).toUpperCase() + title.slice(1)
                    commit('setMyFav', fav)
                })
    
            if (result.length >= state.page.loadLimit) {
                state.page.pageFavs++
            } else {
                state.page.onlyForceLoad = true
            }
    
            commit('page/setPageLoading', false)
        }