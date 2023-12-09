<template>
    <section class="board__content" :key="loc">
        <TransitionGroup name="list">
            <item-card  v-for="([box_id, box], index) of items"
                :key="`${loc}_${box_id}`"
                :box="box"
                >
            </item-card>
        </TransitionGroup>
        <div v-if="fetcher != undefined"
            class="observer"
            :class="{'content__loading': page.isPageLoading}"
            :data-observe="loc"
            v-intersection="() => this.$store.dispatch(fetcher)">
        </div> 
    </section>
</template>
    
<script>
import ItemCard from '@/components/ItemCard.vue';
import { mapState } from 'vuex';

export default {
    components: {
        ItemCard
    },
    computed: {
        ...mapState(["account", "page"]),

        fetcher() {
            const fetchers = {
                auction: "fetchAuction",
                bids: "fetchBids",
                lots: "fetchLots",
                storage: "fetchStorage",
                production: "fetchProduction",
                favs: "fetchFavs",
            }

            return fetchers[this.loc]
        },

        loc() {
            return this.account.loc
        },

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
                return this.$store.state.production
            } else if (this.account.loc === 'favs') {
                return this.$store.state.favs
            }
        }
    }
}
</script>
    
<style>
.board__content {
    height: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
}

.observer {
    width: 100%;
    height: 25px;
    background-color: rgba(0, 128, 0, 0);
    align-self: flex-end;
}

.content__loading {
    animation-name: loading;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: reverse;
}

@keyframes loading {
    0% {
        background-color: rgba(139, 176,193, 0);
        transform: translateY(50px);
    }
    50% {
        background-color: var(--color-one);
        transform: translateY(0);
    }
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