<template>
    <form @submit.prevent="submit" @click="clear">
        <fieldset @click.stop>
            <input v-model="this.login" type="text" placeholder="Login" required>
            <input v-model="this.password" type="password" placeholder="Password" required>
            <div class="auth">
                <input v-model="this.path" type="radio" name="auth" id="signin" value="signin" checked>
                <input v-model="this.path" type="radio" name="auth" id="signup" value="signup">
                <label :class="{checked: this.path == 'signin'}" for="signin">Sign In</label>
                <label :class="{checked: this.path == 'signup'}" for="signup">Sign Up</label>
            </div>
            <input type="submit" value="Confirm">
        </fieldset>
    </form>   
</template>
    
<script>
import { parseIntegers } from "@/scripts";

export default {
    data() {
        return {
            login: null,
            password: null,
            name: 'SignUpForm',
            path: 'signin'
        }
    },
    methods: {
        async submit() {
            this.$store.commit('clearForm')

            console.log('---sign in---')
            console.log(import.meta.env.VITE_URL)
            console.log('---sign in---')

            const URL = `${import.meta.env.VITE_URL}/${this.path}?login=${this.login}&password=${this.password}`
            const { ok, error } = await fetch(URL, {credentials: 'include'})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            if ( ok ) {
                console.log('--- ok ---')
                this.$store.commit('setAccountLoading', true)
                console.log('--- 1 ---')
                this.$store.commit('setPageLoading', true)
                console.log('--- 2 ---')
                this.$store.state.pageNumber = 0
                this.$store.state.onlyForceLoad = false
                
                this.$store.commit('clearLogin')
                console.log('--- 3 ---')
                await this.$store.dispatch('fetchAccountData')
                console.log('--- 4 ---')
                this.$store.commit('setLogin', this.login)
                console.log('--- 5 ---')
                this.$store.commit('setSocket')
                console.log('--- 6 ---')
                this.$store.dispatch('fetchAuction')
                console.log('--- 7 ---')
                this.$store.dispatch('fetchProduction')
                console.log('--- 8 ---')
                this.$store.dispatch('fetchStorage')
                console.log('--- 9 ---')
            }

            if (error) {
                console.log(error)
            }

            this.clear()
        },

        clear() {
            this.login = null
            this.password = null
        },
    }

}
    
</script>
    
<style scoped>
    input[type='radio'] {
        display: none;
    }
    label {
        flex: auto 1 1;
        text-align: center;
        background-color: white;
        transition: all 0.3s ease;
        padding: 10px;
        margin-bottom: 10px;
        color: rgb(200, 200, 200);
    }

    .checked {
        background-color: rgba(41, 63,73, 0.9);
        text-decoration: underline;
        color: rgb(250, 250, 250);
        font-weight: bold;
    }
    .auth {
        display: flex;
        flex-direction: row;
    }
</style>