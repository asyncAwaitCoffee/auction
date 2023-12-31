import { MySocket } from "@/socket"

export default {
    namespaced: true,
    state: {
        loc: "home",
        money: null,
        login: null,
        socket: null,
        isAccountLoading: true,
    },
    mutations: {
        setMoney(state, amount) {
            state.money = amount
        },

        setLogin(state, login) {
            if (!login) {
                return
            }
            state.login = login
            this.commit('account/setSocket')
            this.commit("account/setAccountLoading", false)
        },

        clearLogin(state) {
            state.login = null
            state.money = null

            state.loc = "home"

            MySocket.clear()
            state.socket = null
        },

        setSocket(state) {
            if (state.login != null) {
                try {
                    state.socket = MySocket.getSocket();
                } catch(error) {
                    console.error(error)
                }                
            }
        },

        setAccountData(state,  accountData) {
            if (!accountData) {
                return
            }
            state.login = accountData.login
            state.money = accountData.my_money
            this.commit("account/setAccountLoading", false)
        },

        setAccountLoading(state, isLoading) {
            state.isAccountLoading = isLoading
        },

        changeLoc(state, loc) {
            state.loc = loc
        }, 
    },
    getters: {
        getLogin(state) {
            return state.login
        },
        getMoney(state) {
            return state.money
        },
        getSocket(state) {
            return state.socket
        },
        isAccountLoading(state) {
            return state.isAccountLoading
        },
    }
}