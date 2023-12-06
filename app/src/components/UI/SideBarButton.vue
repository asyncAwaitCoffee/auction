<template>
    <router-link
        class="sb-btn"
        :to="`/${id}`"
    >{{ label }}</router-link>    
</template>
    
<script>
import { mapState } from 'vuex';
import { toTitled } from '@/scripts/'

export default {
    props: {
        id: {
            type: String
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(["account"]),

        isChecked() {
            return this.id == this.account.loc
        },

        label() {
            return toTitled(this.id)
        }
    }
}
</script>
    
<style scoped>
    .sb-btn:hover {
        background-image: linear-gradient(0.25turn, var(--color-two), transparent 45%);
        border-left: 14px solid var(--color-six);
        transition: all 0.25s linear;
        color: white;

        @media screen and (max-width: 1200px) {
            background-image: linear-gradient(1turn, var(--color-two), transparent 45%);
            border-left: none;
            border-bottom: 2px solid var(--color-six);
            color: black;
        }
    }

    .sb-btn:hover ~ .sb-btn,
    .sb-btn:has(~ :hover) {
        background-color: rgba(255, 255, 255, 0.4);
        padding: 15px 0 15px 20px;

        @media screen and (max-width: 1200px) {
            transform: translate(0, 5px);
            padding: 15px 0 15px 0;
        }
    }

    .sb-btn.router-link-active {
        background-image: linear-gradient(0.25turn, var(--color-two), transparent);
        color: white;
        border-left: 20px solid var(--color-six);
        z-index: 1;

        @media screen and (max-width: 1200px) {
            background-image: linear-gradient(1turn, var(--color-two), transparent);
            border-left: none;       
            border-bottom: 4px solid var(--color-six);
        }

    }
    
    .sb-btn {
        color: black;
        text-decoration: none;
        text-align: left;
        font-size: clamp(12px, 1.4rem, 14px);
        user-select: none;
        padding: 15px 0 15px 15px;
        flex: 1 1 auto;
        position: relative;
        transition: all 1.25s ease;
        white-space: nowrap;
        border-bottom: 1px solid var(--color-six);
        border-left: 4px solid var(--color-four);

        @media screen and (max-width: 1200px) {
            padding: 15px 0;
            text-align: center;
            border-left: none;
            border-bottom: 4px solid rgb(255, 255, 255, 0);
        }
    }
</style>