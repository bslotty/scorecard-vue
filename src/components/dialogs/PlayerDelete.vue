<script lang="ts" setup>
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";
import { useDialog } from "@/stores/dialog.store";
import { usePlayerList } from "@/stores/player.store";

const $dialog  = useDialog();
const $players = usePlayerList();
let   player   = $dialog.data.player;

function close() {
  $dialog.close();
}

function remove(){
    $dialog.close();
    $players.remove(player);
}
</script>


<template>
  <div class="d-flex justify-content-between align-items-center gap-5">
    <h2>Player Details</h2>
    <div class="d-flex flex-nowrap gap-3">
      <Button
        iconName="check"
        :iconColor="MatColor.light"
        :bgColor="MatColor.accent"
        @click="remove()"
      ></Button>

      <Button
        iconName="close"
        :iconColor="MatColor.dark"
        :bgColor="MatColor.transparent"
        @click="close()"
      ></Button>
    </div>
  </div>

  <hr class="my-0"> 

  <div class="d-flex justify-content-center">
    <p>Are you sure you want to remove <strong>{{ player.name }}</strong>?</p>
  </div>
  
</template>
