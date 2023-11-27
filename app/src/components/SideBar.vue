<template>
    <nav>
        <side-bar-button
            :class="{'active-btn': account.loc === 'auction'}"
            @click="$store.commit('account/changeLoc', 'auction')"
        >Auction</side-bar-button>
        <side-bar-button
            :class="{'active-btn': account.loc === 'bids'}"
            @click="$store.commit('account/changeLoc', 'bids')"
        >My Bids</side-bar-button>
        <side-bar-button
            :class="{'active-btn': account.loc === 'lots'}"
            @click="$store.commit('account/changeLoc', 'lots')"
        >My Lots</side-bar-button>
        <side-bar-button
            :class="{'active-btn': account.loc === 'storage'}"
            @click="$store.commit('account/changeLoc', 'storage')"
        >Storage</side-bar-button>
        <side-bar-button
            :class="{'active-btn': account.loc === 'production'}"
            @click="$store.commit('account/changeLoc', 'production')"
        >Production</side-bar-button>
        <side-bar-button
            :class="{'active-btn': account.loc === 'favs'}"
            @click="$store.commit('account/changeLoc', 'favs')"
        >Favs</side-bar-button>
    </nav>
</template>
    
<script>
import SideBarButton from '@/components/UI/SideBarButton.vue';
import { mapState } from 'vuex';

export default {
    components: {
        SideBarButton
    },
    computed: {
        ...mapState(["account"])
    }
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