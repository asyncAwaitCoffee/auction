<template>

    <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
            <component :is="Component" :key="$router.path"></component>
        </transition>
    </router-view>
    
<!--     <div v-show="account.loc == 'logs'">
        logs
    </div> -->

</template>

<script>
import ItemCard from '@/components/ItemCard.vue';
import MainContentBlock from './MainContentBlock.vue';
import HomePage from './HomePage.vue'

import { mapState } from 'vuex';

export default {
    components: {
        ItemCard, MainContentBlock, HomePage
    },

    data() {
        return {
            title: undefined,
            quantity: undefined,
            item_id: undefined,
            data_list: ["auction", "bids", "lots", "storage", "production", "favs"]
        }
    },

    computed: {
        ...mapState(["account", "page"])
    },

    async mounted() {
        await this.$store.dispatch('fetchAccountData')
        this.$store.commit('account/setSocket')
    },
    watch: {
        'account.login':
            function(newVal, prevVal) {
                console.log(`Watch login: ${prevVal} -> ${newVal}`)
            },
        'account.isAccountLoading':
            function(newVal, prevVal) {
                console.log(`Watch isAccountLoading: ${prevVal} -> ${newVal}`)
            }
    }
}
</script>
<style scoped>

.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>