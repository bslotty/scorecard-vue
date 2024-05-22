<script setup lang="ts">
import { usePlayerList } from "@/stores/player.store";
import { useDialog } from "@/stores/dialog.store";
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";

const $players = usePlayerList();
const $dialog = useDialog();

function reset() {
  $players.clearPlayers();
  close();
}

function restart() {
  $players.restartMatch();
  close();
}

function close() {
  $dialog.close();
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center gap-5">
    <h2>Reset Game</h2>
    <div class="d-flex flex-nowrap gap-3">
      <Button
        iconName="close"
        :iconColor="MatColor.dark"
        :bgColor="MatColor.transparent"
        @click="close()"
      ></Button>
    </div>
  </div>
  
  <hr class="my-0">

  <div class="d-flex justify-content-center my-2">
    <p>Pick what to delete.</p>
  </div>

  <div class="d-flex justify-content-bewteen align-items-center gap-5">
    <Button
      @click="reset()"
      label="Everything"
      :bgColor="MatColor.warn"
      :iconColor="MatColor.light"
      class="mat-raised shadow-sm flex-grow-1 py-5"
    ></Button>
    <Button
      @click="restart()"
      label="Scores"
      :bgColor="MatColor.accent"
      :iconColor="MatColor.light"
      class="mat-raised shadow-sm flex-grow-1 py-5"
    ></Button>
  </div>
</template>
