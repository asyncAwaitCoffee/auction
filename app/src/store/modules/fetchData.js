import { Item, Lot, Storage, parseIntegers } from "@/scripts";

const adress = import.meta.env.VITE_URL

export default {
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
    }
}