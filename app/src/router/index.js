import store from '@/store'
import {createRouter} from 'vue-router'
import {createWebHistory} from 'vue-router'

import HomePage from "@/components/HomePage.vue"
import MainContentBlock from "@/components/MainContentBlock.vue"
import NotFound404 from "@/components/NotFound404.vue"

const routes = [
    {path: "/", redirect: { name: 'Home' }},
    {path: "/home", name: "Home", component: HomePage},
    {path: "/auction", name: "Auction", component: MainContentBlock}, // /:parameter
    {path: "/bids", name: "Bids", component: MainContentBlock, meta: {authRequired: true}},
    {path: "/lots", name: "Lots", component: MainContentBlock, meta: {authRequired: true}},
    {path: "/storage", name: "Storage", component: MainContentBlock, meta: {authRequired: true}},
    {path: "/production", name: "Production", component: MainContentBlock, meta: {authRequired: true}},
    {path: "/favs", name: "Favs", component: MainContentBlock, meta: {authRequired: true}},
    {path: "/logs", name: "Logs", component: MainContentBlock, meta: {authRequired: true}},
    {path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound404},
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    if (to.meta.authRequired && !store.state.account.login && !store.state.account.isAccountLoading) {
        store.commit('page/setForm', {form: "SignUpForm"})
        return {name: from.name}
    }
})

router.afterEach((to, from) => {
    store.commit('account/changeLoc', to.fullPath.slice(1))
})

export default router