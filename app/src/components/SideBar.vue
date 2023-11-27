<template>
    <nav>
        <side-bar-button
            :class="{'active-btn': $store.state.loc === 'auction'}"
            @click="$store.commit('changeLoc', 'auction')"
        >Auction</side-bar-button>
        <side-bar-button
            :class="{'active-btn': $store.state.loc === 'bids'}"
            @click="$store.commit('changeLoc', 'bids')"
        >My Bids</side-bar-button>
        <side-bar-button
            :class="{'active-btn': $store.state.loc === 'lots'}"
            @click="$store.commit('changeLoc', 'lots')"
        >My Lots</side-bar-button>
        <side-bar-button
            :class="{'active-btn': $store.state.loc === 'storage'}"
            @click="$store.commit('changeLoc', 'storage')"
        >Storage</side-bar-button>
        <side-bar-button
            :class="{'active-btn': $store.state.loc === 'production'}"
            @click="$store.commit('changeLoc', 'production')"
        >Production</side-bar-button>
        <side-bar-button
            :class="{'active-btn': $store.state.loc === 'favs'}"
            @click="$store.commit('changeLoc', 'favs')"
        >Favs</side-bar-button>
    </nav>
</template>
    
<script>
import SideBarButton from '@/components/UI/SideBarButton.vue';
export default {
    components: {
        SideBarButton
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
        border-bottom: 4px solid var(--color-four);
        background-image: linear-gradient(var(--color-two), var(--color-three) 15%, var(--color-three));
        min-height: 40px;

        overflow: scroll;

        @media screen and (max-width: 900px) {
            flex-flow: row;
            height: 100%;
            width: 100%;
        }
    }
    nav::-webkit-scrollbar {
        display: none;
    }


</style>