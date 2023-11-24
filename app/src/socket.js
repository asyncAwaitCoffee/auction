import { io } from "socket.io-client"
import store from '@/store'
import { parseIntegers } from "@/scripts";

//const URL = process.env.NODE_ENV === "production" ? undefined : "https://...";

export class MySocket {
  static #socket
  static #URL = import.meta.env.VITE_URL;

  static clear() {
    if (!this.#socket) {
      return
    }
    this.#socket.disconnect()
    this.#socket = null
  }

  static getSocket() {
    if (this.#socket) {
      return this.#socket
    }

    this.#socket = io(this.#URL, {withCredentials: true})

    this.#socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      this.#socket.disconnect() // do something
    });
  
    this.#socket.on("crafted", (data) => {
      const { production_id, item_id } = JSON.parse(data, parseIntegers)
      const production = store.getters.getProduction(production_id)
      production.done = true

      store.commit('addItem', production)
    });
  
    this.#socket.on("craft_aborted", (data) => {
      const parsed = JSON.parse(data, parseIntegers)
      const { production_id } = parsed
      const production = store.getters.getProduction(production_id)
      production.process = false
      production.progress = 0
      production.done = true
    });
  
    this.#socket.on("bid_refund",
      data => {
        const parsed = JSON.parse(data, parseIntegers)
        store.commit('refundBid', parsed)
    });
  
    this.#socket.on("bid_refresh",
      data => {
        const parsed = JSON.parse(data, parseIntegers)
        store.commit('refreshBid', parsed)
    });

    return this.#socket
  }

  

}

