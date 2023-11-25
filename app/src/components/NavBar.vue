<template>
    <nav>
        <!-- <nav-button class="btn home" :route="'/'">Home</nav-button> -->
        <nav-button v-if="this.$store.state.login == null"
            class="btn auth"
            @click="this.$store.commit('setForm', {form: 'SignUpForm'})"
        >Sign In</nav-button>
        <nav-button v-else
            class="btn auth"
            @click="signout"
        >Sign Out</nav-button>
    </nav>
</template>
<script>
import NavButton from '@/components/UI/NavButton.vue';
import { parseIntegers } from "@/scripts";
export default {
    components: {
        NavButton
    },
    methods: {        
        async signout() {
            const URL = `${import.meta.env.VITE_URL}/signout`
            const { ok } = await fetch(URL, {credentials: 'include'}) // TODO: credentials are not necessary?
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            if ( ok ) {
                localStorage.removeItem('candy');
                this.$store.state.onlyForceLoad = false
                this.$store.state.pageNumber = 0
                this.$store.commit('clearLogin')
                this.$store.dispatch('fetchAuction')
            }
        },
    }
}
</script>
<style scoped>
nav {
    background-image: linear-gradient(rgba(139, 176,193, 0.3), rgba(139, 176,193, 1));
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    align-items: stretch;
    width: 100%;
    min-height: 40px;
    border-bottom: 4px solid var(--color-five);
    overflow: hidden;
}

.home {
    margin-right: 70%;
}

.btn.auth::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    transform: skew(0.2turn);
    background-color: var(--color-five);
}
</style>