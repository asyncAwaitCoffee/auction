<template>
    <section v-if="page.activeForm === 'Announcement' && this.noCandy" @mousedown="this.$store.commit('page/clearForm')">
        <div @mousedown.stop>
          <article class="text-left">
            <h3>Hello and welcome to my Auction website!</h3>
            <p>This site is a practice ground for new skills and implementations.</p>
            <p>Please allow a few seconds for the web service to wake up and load data.</p>
            <p>You can sign up or use a pre-created account { test : 123 }.</p>
            <p>Have a great day!</p>
          </article>
          <article class="text-right">
            <h3>Stack used:</h3>
            <p>Vue.js | Express.js | Socket.io | PostgreSQL</p>
          </article>
        </div>
    </section>
</template>
    
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      noCandy: !localStorage.candy
    }
  },
  computed: {
    ...mapState(["page"])
  }
}    
</script>
    
<style scoped>
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
        background-color: rgba(41, 63,73, 0.3);
        position: fixed;
        z-index: 99;
    }

    div {
        font-size: clamp(12px, 2vmin, 30px);
        position: fixed;
        width: 70%;
        padding: 0 10%;
        background-color: var(--color-pop);
        border-radius: 15px;
        color: white;
        animation-name: bounce-in;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        overflow: hidden;
        box-shadow: 0 0 15px 15px var(--color-pop);
    }

    @keyframes bounce-in {
      0% {
        opacity: 0.5;
      }
    }

    article {
      color: var(--color-one);
      border-radius: 5px;
      padding: 10px;
    }

    article:not(:last-child) {
      margin-bottom: 20px;
    }

    .text-left {
      border-top: 4px solid var(--color-three);
      border-left: 4px solid var(--color-three);
      padding-left: 20px;
    }

    .text-right {
      text-align: right;
      border-right: 4px solid var(--color-three);
      border-bottom: 4px solid var(--color-three);
      padding-right: 20px;
    }

    h3, p {
      margin-bottom: 5px;
    }
</style>