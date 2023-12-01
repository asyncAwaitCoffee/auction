<template>

    <HomePage class="board__content" v-show="account.loc == 'home'" />
    
    <div v-show="account.loc == 'logs'">
        logs
    </div>

    <template v-show="account.loc != 'home'" v-for="data in data_list">
        <MainContentBlock
            v-show="data == account.loc"
            :items="this[data]"
            :loc="data"
        />
    </template>
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
        ...mapState(["account", "page"]),

        auction() {
            return this.$store.state.auction
        },

        bids() {
            return this.$store.state.bids
        },

        lots() {
            return this.$store.state.lots
        },

        storage() {
            return this.$store.state.storage
        },

        production() {
            return this.$store.state.production
        },

        favs() {
            return this.$store.state.favs
        },

        items() {
            if (this.account.loc === 'auction') {
                return this.auction
            } else if (this.account.loc === 'bids') {
                return this.bids
            } else if (this.account.loc === 'lots') {
                return this.lots
            } else if (this.account.loc === 'storage') {
                return this.storage
            } else if (this.account.loc === 'production') {
                return this.production
            } else if (this.account.loc === 'favs') {
                return this.favs
            }
        }
    },
    async mounted() {
        await this.$store.dispatch('fetchAccountData')
        //this.$store.dispatch('fetchAuction')
        this.$store.commit('account/setSocket')
        //this.$store.dispatch('fetchProduction')
        //this.$store.dispatch('fetchStorage') 
    }
}
</script>
<style scoped>



</style>