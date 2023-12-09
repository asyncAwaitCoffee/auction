<template>
    <nav>
        <template v-for="loc in locations">
            <side-bar-button
                :id="loc"
            >        
            </side-bar-button>
        </template>
    </nav>
</template>
    
<script>
import SideBarButton from '@/components/UI/SideBarButton.vue';
import { mapState } from 'vuex';

export default {
    components: {
        SideBarButton
    },
    data() {
        return {
            locations: [
                "home", "auction", "bids", "lots", "storage", "production", "favs", "logs"
            ]
        }
    },
    computed: {
        ...mapState(["account"])
    }
}    
</script>
    
<style scoped>
    nav {
        display: flex;
        flex-flow: column;
        flex-wrap: nowrap;
        background: transparent;
        gap: 5px;
        padding-left: 15px;

        @media screen and (max-width: 1200px) {
            padding-left: 0;
            flex-flow: row;
            height: 100%;
            width: 100%;
            gap: 0;
        }
    }
    nav::-webkit-scrollbar {
        display: none;
    }


</style>