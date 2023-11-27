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
        position: relative;
        isolation: isolate;        
        font-size: clamp(12px, 1.4vmin, 25px);
        white-space: nowrap;

        @media screen and (max-width: 900px) {
            width: 50%;
        }
    }
    
</style>