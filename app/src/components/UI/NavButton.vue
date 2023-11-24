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
        color: black;
        text-decoration: none;
        width: 25%;
    }
</style>