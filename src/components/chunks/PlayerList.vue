<script setup lang="ts">
import type { Player } from "@/models/Player";
import PlayerCard from "./PlayerCard.vue";

const props = defineProps<{
  players: Player[];
}>();
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <transition-group name="bounce" tag="div">
      <PlayerCard
        v-for="(player, index) of props.players"
        v-bind:key="player.id"
        :player="player"
        :place="index"
      ></PlayerCard>
    </transition-group> 
  </div>
</template>
