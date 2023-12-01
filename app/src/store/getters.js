export const getProduction = (state) => {
    return (production_id) => state.production.get(production_id)
}
    
export const getItemFromAuction = (state) => {
    return (lot_id) => state.auction.get(lot_id).item
}

export const needToLoadMore = (state) => {
    return (pageSource) => state[pageSource].size < state.page.loadLimit
}