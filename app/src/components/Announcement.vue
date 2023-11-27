<template>
    <section v-if="page.activeForm === 'Announcement' && this.noCandy" @click="this.$store.commit('page/clearForm')">
        <div @click.stop>
          <article>
            <p>Hello and welcome to my Auction website!</p>
            <p>This site is a practice ground for new skills and implementations.</p>
            <p>Please allow a few seconds for the web service to wake up and load data.</p>
            <p>You can sign up or use a pre-created account { test : 123 }.</p>
            <p>Have a great day!</p>
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
        font-size: clamp(16px, 2vmin, 30px);
        position: fixed;
        top: 30%;
        width: 70%;
        padding: 40px;
        padding-left: 10%;
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
      border-left: 4px solid var(--color-three);
      color: var(--color-one);
      border-radius: 5px;
      padding-left: 20px;
    }

    p {
      margin-bottom: 5px;
    }
</style>