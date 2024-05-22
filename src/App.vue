<script setup lang="ts">
import SiteHeader from "./components/chunks/SiteHeader.vue";
import PlayerList from "./components/chunks/PlayerList.vue";
import Dialog from "./components/core/Dialog.vue";

import { usePlayerList } from "./stores/player.store";
import type { Player } from "./models/Player";
import { ref, watch } from "vue";

const $players = usePlayerList();
watch($players.getList(), ()=> localStorage.setItem('playerList', JSON.stringify($players.getList())));
</script>

<template>
  <div class="container d-flex flex-column pt-5">
    <SiteHeader />
    <div class="text-success">
      <hr class="border border-dark border-1 mt-0" />
    </div>
    <PlayerList v-if="($players.getList() as Player[]).length > 0" :players="($players.getList() as Player[])" />
      <div v-if="($players.getList() as Player[]).length == 0"class="alert alert-success">
        <p>Add Players to begin.</p>
      </div>
  </div>
  <Dialog></Dialog>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins:wght@100;300;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;300;500&display=swap");
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0";
@import "~bootstrap/scss/bootstrap";

@import "assets/styles/theme.scss";
@import "assets/styles/mixins.scss";
@import "assets/styles/text.scss";
@import "assets/styles/icons-google.scss";
@import "assets/styles/button.scss";
@import "assets/styles/keyframes.scss";

:root {
  --bs-primary        : var(--color-primary);
  --bs-secondary      : var(--color-accent);
  --bs-warn           : var(--color-warn);
  --bs-danger         : var(--color-warn);
  --bs-body-color     : var(--text-dark);
  --bs-secondary-color: var(--color-disabled);
}

* {
  box-sizing: border-box;
  position  : relative;
  margin    : 0;
  padding   : 0;
}

html {
  background: var(--bg-light);
  color     : var(--text-dark);
}

body {
  background: inherit;
  color     : inherit;
  margin    : 0 auto;
  font-size : var(--font-size);

  nav {
    background: transparent;
  }
}

.container {
  display: grid;

  justify-content: center;
  place-content  : stretch;
  gap            : 10px;
  margin         : 0 auto;
  width          : clamp(300px, 98vw, 1200px);

  @include tiny() {
    width: 100%;
  }
}


dialog.card {
  width: clamp(400px, 65vw, 500px);
}

.card {
  &.player {
    display              : grid;
    grid-template-columns: 50px 1fr min-content;
    grid-template-rows   : 1fr;
    align-items          : center;

    @include tiny() {
      > :nth-child(2) {
        display       : flex;
        flex-direction: column;
        justify-self  : stretch;
        align-items   : flex-start;
        gap           : 10px;
      }
    }
  }
}



.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
.bounce-move {
  transition: transform 0.5s var(--bezier-overshoot);
}
@keyframes bounce-in {
  0% {
    transform: translateY(20px);
  }

  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}


.form-control {
  font-size  : 1.3em;
  line-height: 1em;
  padding    : 0.3em;
}


</style>
