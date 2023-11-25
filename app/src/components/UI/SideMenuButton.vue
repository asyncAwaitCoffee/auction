<template>
    <button><slot></slot></button>
</template>
    
<script>
export default {}
</script>
    
<style scoped>
    button:hover {
        background-color: rgba(16, 83, 115, 0.3);
        color: rgba(241, 237,232, 1);
    }
    .active-btn:hover {
        background-color: rgba(16, 83, 115, 0.3);
        color: rgba(241, 237,232, 1);
    }
    button {
        color: black;
        text-decoration: none;
        padding: 1%;
        flex: 1 1 auto;
        position: relative;
        transition: all 0.15s linear;
        white-space: nowrap;
        border-right: 4px solid rgb(255, 255, 255, 0);

        @media screen and (max-width: 900px) {
            border-right: none;
            border-bottom: 4px solid rgb(255, 255, 255, 0);
        }
    }
    .active-btn {
        background-color: rgba(16, 83,115, 1);
        color: rgba(241, 237,232, 1);       
        border-right: 4px solid var(--color-three);
        z-index: 1;

        @media screen and (max-width: 900px) {
            border-right: none;       
            border-bottom: 4px solid var(--color-three);
        }
    }
</style>