<template>
    <section :class="{'content__loading': this.$store.state.isAccountLoading}">
            <h3 :class="{'wait': $store.state.money == null}">{{ this.$store.state.login }}</h3>
            <h1 v-if="$store.state.money != null">{{ $store.state.money }}G</h1>
    </section>
</template>
<script>
export default {
    props: {}
}
</script>
<style scoped>
section {
    height: 10%;
    border: 1px solid rgba(16, 83,115, 1);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
}

h3, h1 {    
    text-align: center;
}

@media screen and (max-width: 900px) {
    section {
        flex-flow: row;
        height: 100%;
        width: 20%;
    }

    h3 {
        display: none;
    }
}
</style>