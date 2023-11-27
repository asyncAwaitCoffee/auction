<template>
    <form @submit.prevent="submit" @click="clear">
        <fieldset @click.stop>
            <input type="text" :value="box.item.title" disabled>
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
            this.box.selling = true
            this.$store.commit('sellLot', {
                item_id: this.box.item.item_id,
                price: this.price,
                bid_step: this.bid_step,
                quantity: this.quantity,
            })
            this.clear()
        },
        clear() {
            this.$store.commit('page/clearForm')
            this.price = null
            this.quantity = null
        },
    },
    computed: {
        box() {
            return this.$store.state.page.formData
        }
    }
}
</script>
    
<style>
</style>