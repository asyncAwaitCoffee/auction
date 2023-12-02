import { toTitled, parseIntegers } from '@/scripts/'
import { adress } from "./modules/constants";

export const fetchAccountData = async ({ commit, state }) =>
    {
        commit('account/setAccountLoading', true)
        const result = await loadData("account")
        
        commit('account/setAccountData', result)
        commit('account/setAccountLoading', false)
    }

export const fetchAuction = async ({ commit, state }) =>
    {
        commit('page/setPageLoading', true)        
        const result = await loadData("auction", state.page.loadLimit, state.auction.size)

        await assignLoadedData(result, (item) => commit("setAuctionLot", item))

        if (result.length > state.page.loadLimit) {
            state.page.pageAuction++
        } else {
            state.page.onlyForceLoad = true
        }

        commit('page/setPageLoading', false)
    }

export const fetchBids = async ({ commit, state }) =>
    {
        commit('page/setPageLoading', true)        
        const result = await loadData("bids", state.page.loadLimit, state.bids.size)

        await assignLoadedData(result, (item) => commit("setMyBid", item))

        if (result.length >= state.page.loadLimit) {
            state.page.pageBids++
        } else {
            state.page.onlyForceLoad = true
        }

        commit('page/setPageLoading', false)
    }

export const fetchLots = async ({ commit, state }) =>
    {
        commit('page/setPageLoading', true)        
        const result = await loadData("lots", state.page.loadLimit, state.lots.size)

        await assignLoadedData(result, (item) => commit("setMyLot", item))

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
        const result = await loadData("storage", state.page.loadLimit, state.storage.size)

        await assignLoadedData(result, (item) => commit("setStorageItem", item))
            
        commit('page/setPageLoading', false)
    }

export const fetchProduction = async ({ commit, state }) =>
    {
        commit('page/setPageLoading', true)
        const result = await loadData("production", state.page.loadLimit, state.production.size)

        await assignLoadedData(result, (item) => commit("setProductionItem", item))
        
        commit('page/setPageLoading', false)
    }

export const fetchFavs = async ({ commit, state }) =>
    {
        commit("page/setPageLoading", true)
        const result = await loadData("favs", state.page.loadLimit, state.favs.size)

        await assignLoadedData(result, (item) => commit("setMyFav", item))

        if (result.length >= state.page.loadLimit) {
            state.page.pageFavs++
        } else {
            state.page.onlyForceLoad = true
        }

        commit("page/setPageLoading", false)
    }

async function loadData(dataSource, limit, offset) {
    const URL = `${adress}/${dataSource}?limit=${limit}&offset=${offset}`            
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

    return result
}

async function assignLoadedData(dataArray, assignMethod) {
        
    dataArray.forEach(
        async element => {
            const {thumbnailUrl, title} = await fetch(`https://jsonplaceholder.typicode.com/photos/${element.item.item_id}`)
                .then(res => res.text())
                .then(data => data ? JSON.parse(data, parseIntegers) : {})
            element.img = thumbnailUrl
            element.text = toTitled(title)
            
            assignMethod(element)
        })
    
}