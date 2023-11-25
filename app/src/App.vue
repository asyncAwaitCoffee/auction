<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import MainContent from '@/components/MainContent.vue';
import SideSubBar from '@/components/SideSubBar.vue';
import InfoBlock from '@/components/InfoBlock.vue';

export default {
  components: {
    NavBar, SideBar, MainContent, SideSubBar, InfoBlock
  },
}
</script>

<template>
  <div class="app">
    <nav-bar class="nav-bar"></nav-bar>
    <section class="side-content">
      <info-block></info-block>
      <side-bar class="side-bar"></side-bar>
<!--       <side-sub-bar class="side-sub-bar"></side-sub-bar> -->
    </section>
    <section :class="{'main-content': true, 'content__loading': this.$store.state.isPageLoading}">
      <main-content></main-content>
    </section>
  </div>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-one: rgba(194, 201,234, 1);
  --color-two: rgba(96, 134,226, 1);
  --color-three: rgba(62, 100,152, 1);
  --color-four: rgba(52, 87,95, 1);
  --color-five: rgba(34, 55,56, 1);
  --gap: 5px;
}

button {
    border: none;
    background: none;
}

html, body {
  width: 100%;
  height: 100%;
}

.app {
  height: 100svh;
  background-image: linear-gradient(90deg, var(--color-one), rgba(255, 255, 255));
  display: grid;
  gap: var(--gap);
  grid-template-columns: 1fr 10fr;
  grid-template-rows: 1fr 20fr;
  grid-template-areas:
    "nav-bar nav-bar"
    "side-content main-content";

  @media screen and (max-width: 900px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 20fr;
    grid-template-areas:
      "nav-bar"
      "side-content"
      "main-content";
    }
}

.nav-bar {
  grid-area: nav-bar;
}

.side-content {
  grid-area: side-content;
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  gap: var(--gap);
  padding: 1px 1px 1px 0;

  @media screen and (max-width: 900px) {
    flex-flow: row;
  }
}

.main-content {
  grid-area: main-content;
  border-top: 1px solid rgba(16, 83,115, 1);
  border-left: 1px solid rgba(16, 83,115, 1);
  border-bottom: 1px solid rgba(16, 83,115, 1);
  overflow-y: scroll;
  position: relative;
}
.main-content::-webkit-scrollbar {
    display: none;
}
.wait:not(.no) {
    animation-name: waiting;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

@keyframes waiting {
    from {
        transform: rotateX(0.5turn);
        background-color: red;
    }
    to {
        transform: rotateX(-0.5turn);
        background-color: var(--color-one);
    }
}

.content__loading {
    animation-name: loading;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

@keyframes loading {
    from {
        background-color: rgba(139, 176,193, 1);
    }
    to {
        background-color: rgba(139, 176,193, 0.3);
    }
}

.observer {
    width: 25px;
    height: 25px;
    background-color: rgba(0, 128, 0, 0);
    align-self: flex-end;
}
</style>
