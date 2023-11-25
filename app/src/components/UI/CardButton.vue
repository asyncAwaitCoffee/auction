<template>
    <button><slot></slot></button>
</template>
    
<script>
export default {}
</script>
    
<style scoped>
    button:not(.no):hover {
        color: black;
        border: 4px solid rgba(16, 83,115, 1);
        background-color: rgba(241, 237,232, 1);
    }
    button {
        background-color: var(--color-three);
        border: 4px solid rgba(16, 83,115, 1);
        color: rgba(241, 237,232, 1);
        text-decoration: none;
        width: 20%;
        padding: 1%;
        margin-right: 1%;
    }
</style>