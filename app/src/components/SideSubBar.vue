<template>
    <nav>
        <side-bar-button @changeContent="changeContent($event)" :content="'a'">item 1</side-bar-button>
        <side-bar-button @changeContent="changeContent($event)" :content="'b'">item 2</side-bar-button>
        <side-bar-button @changeContent="changeContent($event)" :content="'c'">item 3</side-bar-button>
        <side-bar-button @changeContent="changeContent($event)" :content="'d'">item 4</side-bar-button>
    </nav>
</template>
    
<script>
import SideBarButton from '@/components/UI/SideBarButton.vue';
export default {
    components: {
        SideBarButton
    },
    methods: {        
        changeContent(event) {
            this.$emit('changeContent', event)
        }
    }
}    
</script>
    
<style scoped>
    nav {
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        flex-wrap: nowrap;
        border-top: 1px solid rgba(16, 83,115, 1);
        border-right: 1px solid rgba(16, 83,115, 1);
        border-bottom: 1px solid rgba(16, 83,115, 1);

        @media screen and (max-width: 900px) {
            flex-flow: row;            
        }
    }
</style>