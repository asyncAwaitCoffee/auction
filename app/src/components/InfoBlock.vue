<template>
    <section :class="{'content__loading': account.isAccountLoading && account.login != null}">
        <nav-button class="info" v-if="account.money != null">Transactions</nav-button>
        <nav-button class="info" v-if="account.money != null">{{ account.money }}G</nav-button>
    </section>
</template>
<script>
import NavButton from '@/components/UI/NavButton.vue';
import { mapState } from 'vuex';

export default {
    components: {
        NavButton
    },
    computed: {
        ...mapState(["account"])
    }
}
</script>
<style scoped>
section {
    width: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    justify-items: center;
    align-items: center;

    @media screen and (max-width: 900px) {
        display: none;
    }
}

h3, h1 {    
    text-align: center;
}

.info {
    color: var(--color-five);
    border-right: 2px solid var(--color-five);
    min-width: 20%;
}


</style>