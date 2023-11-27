export default {
    namespaced: true,
    state: {

        activeForm: 'Announcement',
        formData: null,
        
        isPageLoading: true,
        pageNumber: 0,
        onlyForceLoad: false,
        loadLimit: 25
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
        }
    }
}