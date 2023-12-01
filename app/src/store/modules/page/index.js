export default {
    namespaced: true,
    state: {

        activeForm: null,
        formData: null,
        
        isPageLoading: false,
        pageAuction: 0,
        pageBids: 0,
        pageLots: 0,
        pageStorage: 0,
        pageProduction: 0,
        pageFavs: 0,
        onlyForceLoad: false,
        loadLimit: 20
    },
    mutations: {

        setForm(state, {form, data}) {
            state.activeForm = form
            state.formData = data
        },

        clearForm(state) {
            state.activeForm = null
            state.formData = null
        },

        setPageLoading(state, isLoading) {
            state.isPageLoading = isLoading
        },

        clearPage(state) {
            state.onlyForceLoad = false
            state.pageNumber = 0
        }
    }
}