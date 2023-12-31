<template>
    <nav>
        <nav-button class="btn home" :route="'/'">Auction Online</nav-button>
        <info-block></info-block>
        <div class="btn-group" :class="{'nav-loading': account.isAccountLoading}" >
            <nav-button v-if="account.login == null && !account.isAccountLoading"
                class="btn auth"
                @click="this.$store.commit('page/setForm', {form: 'SignUpForm'})"
            >Sign In</nav-button>
            <nav-button v-if="account.login != null && !account.isAccountLoading"
                class="info btn auth short"
            >{{ account.login }}</nav-button>
            <nav-button v-if="account.login != null && !account.isAccountLoading"
                class="btn short signout"
                @click="signout"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.5em" viewBox="-0.3 -0.3 7.6 11.6">
	                <path d="M 0 0 L 0 9 L 6 11 L 6 2 z M 1 2 L 4 3 L 4 9 L 1 8 Z M 0 0 L 7 0 L 7 9 L 6 9" stroke-width="0.3" fill="none"/>
                </svg>
            </nav-button>
        </div>
    </nav>
</template>
<script>
import NavButton from '@/components/UI/NavButton.vue';
import InfoBlock from '@/components/InfoBlock.vue';
import { parseIntegers } from "@/scripts";
import { mapState } from 'vuex';

export default {
    components: {
        NavButton, InfoBlock
    },
    methods: {        
        async signout() {
            this.$store.commit('account/setAccountLoading', true)
            
            const URL = `${import.meta.env.VITE_URL}/signout`
            const { ok } = await fetch(URL, {credentials: 'include'}) // TODO: credentials are not necessary?
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            this.$store.commit('account/setAccountLoading', false)

            if ( ok ) {
                localStorage.removeItem('candy');

                this.$store.state.page.onlyForceLoad = false
                this.$store.state.page.pageNumber = 0
                
                this.$store.commit('account/clearLogin')
                this.$store.commit('clearAuction')

                this.$router.push({name: "Home"})
            }
        },
    },
    computed: {
        ...mapState(["account", "page"])
    }
}
</script>
<style scoped>
nav {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    min-height: 40px;
    border-bottom: 4px solid var(--color-four);
    overflow: hidden;
    background: transparent;
}
.btn.home {
    font-size: clamp(10px, 1.4rem, 25px);
    white-space: nowrap;
    font-weight: bold;
    text-align: left;
    padding-left: 15px;
    color: var(--color-five);
    background: -webkit-linear-gradient(
        var(--color-six) 30%,
        var(--color-six),
        var(--color-three) 50%,
        var(--color-six) 60%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    min-width: fit-content;
}

.btn-group {
    width: 20%;
    gap: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    isolation: isolate;

    @media screen and (max-width: 1200px) {
        width: 50%;
    }
}

.btn-group::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    transform: skew(0.2turn);
    background-color: var(--color-five);
    transition: scale 0.25s, transform 0.25s;
}

.btn-group.nav-loading::after {

    scale: 0.5 1;

    animation-name: nav-loading-ani;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

@keyframes nav-loading-ani {
    from {
        background-color: var(--color-two);
    }
    to {
        background-color: var(--color-one);
    }
}

.btn.short {
    width: fit-content !important;
}

svg {
    stroke: #eeeeee;
}

.signout:hover svg {
    stroke: #ee0000;
}

</style>