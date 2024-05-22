<script setup lang="ts">
import GameReset from "../dialogs/GameReset.vue";
import { useDialog } from "@/stores/dialog.store";
import PlayerAdd from "../dialogs/PlayerAdd.vue";
import PlayerDetails from "../dialogs/PlayerDetails.vue";
import PlayerDelete from "../dialogs/PlayerDelete.vue";
import ScoreAdd from "../dialogs/ScoreAdd.vue";

const $dialog = useDialog();

function close(event: MouseEvent) {
  if (event.target == null) return;
  if (event.target instanceof HTMLElement && event.target.classList.contains("dialog-backdrop")) {
    $dialog.close();
  }
}
</script>

<template>
  <div
    class="dialog-backdrop"
    :class="{ visible: $dialog.target != '' }"
    v-if="$dialog.target != ''"
    @mousedown="close($event)"
  >
    <dialog class="card p-1 d-flex flex-column justify-content-start align-items-stretch gap-2 shadow-lg">
      <GameReset v-if="$dialog.target == 'reset'"></GameReset>
      <PlayerAdd
        v-if="$dialog.target == 'playerAdd'"
        name=""
      ></PlayerAdd>
      <PlayerDetails
        v-if="$dialog.target == 'playerEdit'"
        name=""
      ></PlayerDetails>
      <PlayerDelete v-if="$dialog.target == 'playerDelete'"></PlayerDelete>
      <ScoreAdd
        v-if="$dialog.target == 'scoreAdd'"
        score="0"
      ></ScoreAdd>
    </dialog>
  </div>
</template>

<style lang="scss">
.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-shade);
  padding-top: 5rem;
  display: grid;
  align-items: start;
  justify-content: center;

  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  z-index: -1;

  &.visible {
    opacity: 1;
    z-index: 5;

    dialog {
      display: flex;
      animation: pop-in 300ms;
      animation-fill-mode: forwards;
    }
  }
}
dialog {
  z-index: 5;
}
</style>
