<template>
    <section class="board__content">
        <TransitionGroup name="list">
            <item-card v-for="[box_id, box] of items"
                class="item-card"
                @active_form="(active_form, item_id, title, quantity) => {this.activeForm = active_form, this.item_id = parseInt(item_id), this.title = title, this.quantity = parseInt(quantity)}"
                :key="`${account.loc}_${box_id}`"
                :box="box">
            </item-card>
        </TransitionGroup>
        <div v-if="account.loc === 'auction'" v-intersection="() => this.$store.dispatch('fetchAuction')" class="observer"></div> 
        <lot-form v-if="page.activeForm === 'LotForm'">
        </lot-form>
        <auth-form v-if="page.activeForm === 'SignUpForm'"></auth-form>
        <announcement></announcement>
    </section>
</template>
<script>
import ItemCard from '@/components/ItemCard.vue';
import LotForm from '@/components/LotForm.vue';
import AuthForm from '@/components/AuthForm.vue';
import Announcement from '@/components/Announcement.vue';
import { mapState } from 'vuex';

export default {
    components: {
        ItemCard, LotForm, AuthForm, Announcement
    },
    data() {
        return {
            title: undefined,
            quantity: undefined,
            item_id: undefined,
        }
    },
    computed: {
        ...mapState(["account", "page"]),

        items() {
            if (this.account.loc === 'auction') {
                return this.$store.state.auction
            } else if (this.account.loc === 'bids') {
                return this.$store.state.bids
            } else if (this.account.loc === 'lots') {
                return this.$store.state.lots
            } else if (this.account.loc === 'storage') {
                return this.$store.state.storage
            } else if (this.account.loc === 'production') {
                return this.$store.state.products
            } else if (this.account.loc === 'favs') {
                return this.$store.state.favs
            }
        }
    },
    async mounted() {
        await this.$store.dispatch('fetchAccountData')
        //this.$store.dispatch('fetchAuction')
        this.$store.commit('account/setSocket')
        this.$store.dispatch('fetchProduction')
        this.$store.dispatch('fetchStorage') 
    }
}
</script>
<style scoped>
.board__content {
    height: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
}

.list-enter-active {
  transition: transform 0.5s ease, background-color 1s ease, box-shadow 1s ease, opacity 1s ease;
}

.list-leave-active {
  transition: all 0s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 99;
  box-shadow: 0 10px 5px 10px rgba(80, 147,179, 0.3);
  position: absolute;
}
</style>