<template>
    <button><slot></slot></button>
</template>
    
<script>
export default {}
</script>
    
<style scoped>
    button:not(.no):hover {
        color: black;
        border: 4px solid var(--color-six);
        background-color: rgba(241, 237,232, 1);
    }
    button {
        background-color: var(--color-three);
        border: 4px solid var(--color-six);
        color: rgba(241, 237,232, 1);
        font-size: clamp(2px, 0.8rem, 16px);
        text-decoration: none;
        width: 20%;
        padding: 1px;
        margin-right: 1%;
    }
</style>