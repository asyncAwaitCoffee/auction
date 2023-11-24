<template>
    <nav>
        <side-menu-button
            :class="{'active-btn': $store.state.loc === 'auction'}"
            @click="$store.commit('changeLoc', 'auction')"
        >Auction</side-menu-button>
        <side-menu-button
            :class="{'active-btn': $store.state.loc === 'bids'}"
            @click="$store.commit('changeLoc', 'bids')"
        >My Bids</side-menu-button>
        <side-menu-button
            :class="{'active-btn': $store.state.loc === 'lots'}"
            @click="$store.commit('changeLoc', 'lots')"
        >My Lots</side-menu-button>
        <side-menu-button
            :class="{'active-btn': $store.state.loc === 'storage'}"
            @click="$store.commit('changeLoc', 'storage')"
        >Storage</side-menu-button>
        <side-menu-button
            :class="{'active-btn': $store.state.loc === 'production'}"
            @click="$store.commit('changeLoc', 'production')"
        >Production</side-menu-button>
        <side-menu-button
            :class="{'active-btn': $store.state.loc === 'favs'}"
            @click="$store.commit('changeLoc', 'favs')"
        >Favs</side-menu-button>
    </nav>
</template>
    
<script>
import SideMenuButton from '@/components/UI/SideMenuButton.vue';
export default {
    components: {
        SideMenuButton
    },
    methods: {}
}    
</script>
    
<style scoped>
    nav {
        height: 30%;
        display: flex;
        flex-flow: column;
        flex-wrap: nowrap;
        border-top: 1px solid rgba(16, 83,115, 1);
        border-right: 1px solid rgba(16, 83,115, 1);
        border-bottom: 1px solid rgba(16, 83,115, 1);

        @media screen and (max-width: 900px) {
            flex-flow: row;
            height: 100%;
            width: 80%;
        }
    }

    .active-btn {
        background-color: rgba(16, 83,115, 0.3);
        color: rgba(241, 237,232, 1);
    }
</style>