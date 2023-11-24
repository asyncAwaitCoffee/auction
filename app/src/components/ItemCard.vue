<template>
    <div class="card__wrapper">
        <div class="item-name">
            {{ `${$store.state.loc == 'production' ? 'Recipe:' : ''} ${$props.box.item.title}` }}
            <span v-if="$store.state.loc != 'production'">({{ $props.box.quantity }})</span>
        </div>
        <div class="item-image">
            <div :style="`background: center / contain no-repeat url(${this.box.img}); width: 100%; height: 100%; filter: drop-shadow(0 0 2px black);`"></div>
        </div>
        <div class="item-text">
            <div>{{ this.box.text }}</div>
        </div>
        <footer>
            <div class="card__btns">
                <card-button
                    v-if="['bids', 'auction', 'favs'].includes($store.state.loc) && $store.state.login != null"
                    :class="{no: this.box.price > $store.state.money}"
                    @click="$store.commit('buyLot', $props.box), $event.target.classList.add('wait')"
                >Buy</card-button>
                <card-button
                    v-if="['bids', 'auction', 'favs'].includes($store.state.loc) && $store.state.login != null"
                    :class="{bidded: $store.state.bids.has(this.box.lot_id), no: this.box.bid_step > $store.state.money}"
                    @click="$store.commit('bidLot', $props.box), $event.target.classList.add('wait')"
                >Bid</card-button>
                <card-button
                    v-if="['bids', 'auction', 'favs'].includes($store.state.loc) && $store.state.login != null"
                    :class="{faved: $store.state.favs.has(this.box.lot_id)}"
                    @click="$store.commit('favLot', $props.box), $event.target.classList.add('wait')"
                >Fav</card-button>
                <card-button
                    v-if="$store.state.loc === 'lots'"
                    @click="$store.commit('cancelLot', $props.box)"
                >Cancel</card-button>
                <card-button
                    v-if="$store.state.loc === 'storage'"
                >Use</card-button>
                <card-button
                    v-if="$store.state.loc === 'storage'"
                    @click="$store.commit('setForm', {form: 'LotForm', data: $props.box})"
                >Sell</card-button>
                <card-button
                    v-if="$store.state.loc === 'production'"
                >Status</card-button>
                <card-button
                    v-show="$store.state.loc === 'production' && $props.box.process"
                    @click="$store.commit('abortCraft', $props.box)"
                    :style="getBarProgress"
                >Abort</card-button>
                <card-button
                    v-show="$store.state.loc === 'production' && !$props.box.process"
                    :class="{'wait': $props.box.done === false}"
                    @click="$store.commit('startCraft', $props.box), $event.target.classList.add('wait')"
                >Craft</card-button>
                <card-button>. . .</card-button>
            </div>
            <div v-if="$props.box.price" class="item-price">
                <p class="small" :title="`Last bid: ${$props.box.current_bid}G. Bid step: ${$props.box.bid_step}G.`">{{ $props.box.current_bid + $props.box.bid_step }}G</p>
                <p class="large">{{ $props.box.price }}G</p>
            </div>
        </footer>
    </div>
</template>
<script>
import CardButton from '@/components/UI/CardButton.vue';

export default {
    components: {
        CardButton
    },
    props: {
        box: {
            type: Object,
            required: true
        }
    },
    computed: {
        getCtaftingProgress() {
            return this.$props.box.progress
        },
        getBarProgress() {
            return `background-image: linear-gradient(0.25turn, rgba(16, 83,115, 1), rgba(16, 83,115, 1) ${this.$props.box.progress}%, red, red 100%)`
        }
    },
}
</script>
<style scoped>
.card__wrapper {
    width: 24.5%;
    aspect-ratio: 1.5;
    border: 1px solid black;
    margin-top: 0.4%;
    margin-left: 0.4%;
    background-color: rgba(255, 255, 255, 0.8);
    transition: 0.5s all;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1%;

    @media screen and (max-width: 1200px) {
        width: 32.8%;
    }

    @media screen and (max-width: 900px) {
        width: 49.4%;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }
}
.card__wrapper:hover {
    background-color: rgba(255, 255, 255, 0.95);
    transform: translateY(1%);
    z-index: 99;
    box-shadow: 0 10px 5px 10px rgba(80, 147,179, 0.3);
}

.item-name {
    height: 10%;
    width: 100%;
    border-bottom: 1px solid rgba(80, 147,179, 0.3);
}
.item-image {
    height: 80%;
    width: 50%;
    padding: 5px;
}
.item-text {
    height: 80%;
    width: 50%;
    padding: 15px;
}
.item-text div {
    background-color: rgba(128, 128, 128, 0.2);
}
.item-price {
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 99;
}

p.small {
    font-size: 1.4rem;
    background-color: rgba(255, 255, 255, 0.3);
}

p.large {
    font-size: 1.8rem;
}

footer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 20%;
    width: 100%;
}

.card__btns {
    width: 80%;
    display: flex;
    flex-direction: row;
}

.no {
    background-color: red;
    color: black;
}

.no:hover {
    animation-name: quake;
    animation-iteration-count: 5;
    animation-duration: 0.1s;
    animation-timing-function: linear;
    animation-direction: alternate;
}

@keyframes quake {
    from {
        transform: translateX(1%);
    }
    to {
        transform: translateX(-1%);
    }
}

.bidded {
    background-color: var(--color-three);
    color: black;
}
.no.bidded {
    background-image: linear-gradient(0.20turn, red, red 50%, var(--color-three), var(--color-three) 50%);
}
.faved {
    background-color: var(--color-three);
    color: black;
}
</style>