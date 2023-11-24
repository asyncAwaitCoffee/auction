<template>
    <form @submit.prevent="submit" @click="clear">
        <fieldset @click.stop>
            <input type="text" :placeholder="box.item.title" disabled>
            <input v-model="this.price" type="number" min="1" placeholder="Price per item" required>
            <input v-model="this.bid_step" type="number" min="1" :max="this.price / 2" placeholder="Raise per bid" required>
            <input v-model="this.quantity" type="number" min="1" :max="box.quantity" placeholder="Quantity" required>
            <input type="submit" value="Submit Lot">
        </fieldset>
    </form>
</template>
    
<script>
export default {
    data() {
        return {
            price: undefined,
            quantity: undefined,
            bid_step: undefined,
            name: 'LotForm'
        }
    },
    methods: {
        submit() {
            this.$store.commit('sellLot', {
                item_id: this.box.item.item_id,
                price: this.price,
                bid_step: this.bid_step,
                quantity: this.quantity,
            })
            this.clear()
            this.$store.commit('clearForm')
        },
        clear() {
            this.price = null
            this.quantity = null
        },
    },
    computed: {
        box() {
            return this.$store.state.formData
        }
    }
}
</script>
    
<style>
    form {
        position: fixed;
        background-color: rgba(41, 63,73, 0.3);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 99;
    }

    fieldset {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        width: 50%;
        height: 50%;
        padding: 150px;
        background-color: rgba(41, 63,73, 0.7);
        border-radius: 15px;
    }

    input {
        padding: 10px;
        margin-bottom: 10px;
    }

    input[type="submit"] {
        background-color: rgba(139, 176,193, 1);
        font-size: 1rem;
    }
</style>