<script setup lang="ts">
import type { Player } from "@/models/Player";
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";
import { ref } from "vue";

const props = defineProps<{
  index: number;
  player: Player;
}>();


const score = defineModel("score", { required: true });
score.value = +props.player.getScore(props.index);
let defaultScore = score.value;
let valid = ref(false);

function save() {
  if (valid.value) {
    props.player.updateScore(score.value, props.index);
    defaultScore = score.value;
    validate();
  }
}

function remove() {
  props.player.removeScore(props.index);
}

function validate() {
  let regex = new RegExp("[0-9\.]+", "gm");
  let m = score.value.match(regex);
  valid.value = m !== null && score.value != defaultScore;
}
</script>

<template>
  <div class="d-flex flex-column justify-content-start">
    <div class="d-flex justify-content-between gap-2">
      <input
        v-model="score"
        type="text"
        placeholder="1234"
        @input="validate()"
        class="form-control right"
      />

      <Button
        v-if="valid"
        iconName="check"
        :iconColor="MatColor.light"
        :bgColor="MatColor.accent"
        @click="save()"
      ></Button>
      <Button
        v-if="!valid"
        iconName="check"
        :iconColor="MatColor.disabled"
        :bgColor="MatColor.transparent"
      ></Button>

      <Button
        iconName="delete"
        :iconColor="MatColor.warn"
        :bgColor="MatColor.transparent"
        @click="remove()"
      ></Button>
    </div>
  </div>
</template>
