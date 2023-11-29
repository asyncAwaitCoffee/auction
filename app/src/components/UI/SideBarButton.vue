<template>
    <button><slot></slot></button>
</template>
    
<script>
export default {}
</script>
    
<style scoped>
    button:hover {
        background-color: var(--color-six);
        color: white;
    }
    .active-btn:hover {
        color: white
    }
    button {
        color: black;
        text-decoration: none;
        font-size: clamp(12px, 1.4rem, 14px);
        padding: 15px;
        flex: 1 1 auto;
        position: relative;
        transition: all 0.15s linear;
        white-space: nowrap;
        border-left: 10px solid var(--color-six);

        @media screen and (max-width: 1200px) {
            border-left: none;
            border-bottom: 4px solid rgb(255, 255, 255, 0);
        }
    }
    .active-btn {
        background-color: var(--color-five);
        color: rgba(241, 237,232, 1);
        border-left: none;
        border-right: 10px solid var(--color-six);
        z-index: 1;

        @media screen and (max-width: 1200px) {
            border-right: none;       
            border-bottom: 4px solid var(--color-six);
        }
    }
</style>