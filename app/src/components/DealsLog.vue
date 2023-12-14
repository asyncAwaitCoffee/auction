<template>
    <div>
        <table class="deals_log">
            <caption>Deals Log</caption>
            <tr>
                <th>Title</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Type</th>
            </tr>
            <tr v-for="([log_id, log], index) of logs">
                <td>{{ log.item.title }}</td>
                <td
                    :class="{
                        money__refund: log.deal_type == 'r',
                        money__spent: log.deal_type != 'r',
                        }"> {{ `${log.deal_type != 'r' ? '-' : '+'}${log.money_spent}` }}G</td>
                <td>{{ new Date(log.deal_date).toLocaleString() }}</td>
                <td>{{ getType(log.deal_type) }}</td>
            </tr>
        </table>
        <div
            class="observer"
            :class="{'content__loading': page.isPageLoading}"
            :data-observe="'logs'"
            v-intersection="() => this.$store.dispatch('fetchLogs')">
        </div>
    </div>
</template>
    
<script>
import { mapState } from 'vuex'

export default {
    methods: {
        getType(letter) {
            const dict = {
                a: "Bought",
                b: "Bidded",
                r: "Refunded"
            }

            return dict[letter]
        }
    },
    computed: {
        ...mapState(["account", "page"]),

        logs() {
            return [...this.$store.state.logs.entries()].sort((a, b) => new Date(a[1].deal_date) - new Date(b[1].deal_date))
        },
    }
}
    
</script>
    
<style>
    .deals_log {
        width: 100%;
    }

    table {
        border-collapse: collapse;
        border: 1px solid var(--color-six);
        position: relative;
    }

    caption {
        font-size: var(--font-h1);
        padding: 5px;
    }

    td,th {
        border: 1px solid var(--color-six);
        padding: 7px 5px;
        text-align: left;
        font-size: var(--font-p1);
    }

    tr:nth-child(even) {
        background-color: var(--color-two);
    }

    .money__spent {
        background-color: rgba(190, 0, 0, 0.3);
    }

    tr:nth-child(even) .money__spent {
        background-color: rgb(140, 0, 0, 0.3);
    }

    .money__refund {
        background-color: rgb(0, 190, 0, 0.3);
    }

    tr:nth-child(even) .money__refund {
        background-color: rgb(0, 140, 0, 0.3);
    }
    
</style>