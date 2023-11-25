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
    background-image: linear-gradient(rgba(139, 176,193, 1), rgba(191, 226, 242, 0.7) 15%, rgba(255, 255, 255, 0.3));
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
    border-bottom: 4px solid var(--color-five);
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