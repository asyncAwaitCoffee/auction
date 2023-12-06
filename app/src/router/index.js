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
    {path: "/bids", name: "Bids", component: MainContentBlock},
    {path: "/lots", name: "Lots", component: MainContentBlock},
    {path: "/storage", name: "Storage", component: MainContentBlock},
    {path: "/production", name: "Production", component: MainContentBlock},
    {path: "/favs", name: "Favs", component: MainContentBlock},
    {path: "/logs", name: "Logs", component: MainContentBlock},
    {path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound404},
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    store.commit('account/changeLoc', to.fullPath.slice(1))
    next()
})

export default router