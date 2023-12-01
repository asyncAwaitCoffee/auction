<template>
    <button><slot></slot></button>
</template>
    
<script>
export default {}
</script>
    
<style scoped>
    button {
        color: black;
        text-decoration: none;
        padding: 1px;
        margin-right: 5%;
        border-bottom: 1px solid rgb(255, 255, 255, 0);
    }
</style>