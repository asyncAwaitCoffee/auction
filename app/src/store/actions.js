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
        if (state.page.onlyForceLoad) {
            return
        }
        commit('page/setPageLoading', true)
        const URL = `${adress}/auction?limit=${state.page.loadLimit}&offset=${state.page.pageNumber * state.page.loadLimit}`            
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
            state.page.pageNumber++
        } else {
            state.page.onlyForceLoad = true
        }
        commit('page/setPageLoading', false)
    }

export const fetchStorage = async ({ commit, state }) =>
    {
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
    }

export const fetchProduction = async ({ commit, state }) =>
    {
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
    }