<template>
    <form @submit.prevent="submit" @mousedown="clear">
        <fieldset @mousedown.stop>
            <input v-focus v-model="this.login" type="text" placeholder="Login" required>
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
import { adress } from "stores/constants";
import { mapState } from 'vuex';

export default {
    data() {
        return {
            login: null,
            password: null,
            name: 'SignUpForm',
            path: 'signin'
        }
    },
    computed: {
        ...mapState(["account", "page"]),
    },

    methods: {
        async submit() {
            this.$store.commit('page/clearForm')
            this.$store.commit('account/setAccountLoading', true)

            const URL = `${adress}/${this.path}?login=${this.login}&password=${this.password}`
            const { ok, error, candy } = await fetch(URL, {credentials: 'include'})
                .then(res => res.text())
                .then(data => JSON.parse(data, parseIntegers))

            if ( ok ) {
                this.$store.commit('account/setLogin', this.login)
                localStorage.setItem('candy', candy);
                this.$store.commit('page/setPageLoading', true)
                
                this.$store.commit('account/clearLogin')
                this.$store.commit('page/clearPage')
                this.$store.commit('clearAuction')
                await this.$store.dispatch('fetchAccountData')
                this.$store.commit('account/setSocket')

                this.$router.push({name: "Auction"})
                //this.$store.dispatch('fetchAuction')
                //this.$store.dispatch('fetchProduction')
                //this.$store.dispatch('fetchStorage')
            }

            if (error) {
                console.log(error)
            }

            this.clear()
        },

        clear() {
            this.$store.commit('page/clearForm')
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