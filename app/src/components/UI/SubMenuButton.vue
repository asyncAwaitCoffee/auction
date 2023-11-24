<template>
    <button @click="changeContent($props.content)"><slot></slot></button>
</template>
    
<script>
export default {
    props: {
        content: {
            type: String,
            required: true
        }
    },
    methods: {
        changeContent(contentName) {
            this.$emit('changeContent', contentName)
        }
    }
}
</script>
    
<style scoped>
    button:hover {
        background-color: rgba(16, 83,115, 1);
        color: rgba(241, 237,232, 1);
    }
    button {
        color: black;
        text-decoration: none;
        padding: 1%;
        flex: 1 1 auto;
    }
</style>