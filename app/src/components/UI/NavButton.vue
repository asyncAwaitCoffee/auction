<template>
    <button><slot></slot></button>
</template>
    
<script>
export default {
    props: {
        route: {
            type: String,
        }
    },
}
</script>
    
<style scoped>
    button:hover {
        text-decoration: underline;
    }
    button {
        color: var(--color-one);
        text-decoration: none;
        width: 15%;
        position: relative;
        isolation: isolate;

        @media screen and (max-width: 900px) {
            width: 30%;
        }
    }
    
</style>