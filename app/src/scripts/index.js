export class Item {
    constructor(box) {
        this.item_id = box.item.item_id
        this.title = box.item.title
    }
}

export class Lot {
    constructor(item, img, text, lot_id, price, bid_step, quantity, current_bid = 0) {
        this.lot_id = lot_id
        this.price = price
        this.bid_step = bid_step
        this.quantity = quantity
        this.current_bid = current_bid
        this.item = item
        this.img = img
        this.text = text
    }
}

export class Storage {
    constructor(item, img, text, quantity) {
        this.id = item.item_id
        this.quantity = quantity
        this.item = item
        this.img = img
        this.text = text
    }
}

export function parseIntegers(_, value) {    
    const isNum = new RegExp('^[0-9]+$')
    if (isNum.test(value)) {
        return parseInt(value)
    }
    return value
}