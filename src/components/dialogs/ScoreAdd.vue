<script lang="ts" setup>
import type { Player } from "@/models/Player";
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";
import { useDialog } from "@/stores/dialog.store";
import { ref, watch } from "vue";

const $dialog = useDialog();
let   player  = $dialog.data.player as Player;



let   valid   = ref(false);
let   mode    = ref("inc");
let   options = [1, 25, 250, 5, 75, 750, 10, 100, 1000];
const score   = defineModel("score", { required: true, default: "Player" });

watch(score, ()=>{
  validate();
})

function save() {
  if (valid.value) {
    player.addScore(+score.value);
    close();
  }
}

function close() {
  $dialog.close();
}

function validate() {
  let regex       = new RegExp("[0-9\.]+", "gm");
  let m           = score.value.match(regex);
      valid.value = m !== null;
}

function changeMode(n: string) {
  mode.value = n;
}

function changeBy(v: number) {
  if (mode.value == "inc") {
    score.value = +score.value + +v + "";
  } else if (mode.value == "dec") {
    score.value = +score.value - +v + "";
  }
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center gap-5">
    <h2>Add Score</h2>
    <div class="d-flex flex-nowrap gap-3">
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
        iconName="close"
        :iconColor="MatColor.dark"
        :bgColor="MatColor.transparent"
        @click="close()"
      ></Button>
    </div>
  </div>

  <hr class="my-0" />

  <div class="d-flex flex-column justify-content-start">
    <label>Score</label>
    <div class="d-flex gap-2">
      <input
        v-model="score"
        type="text"
        placeholder="1234"
        @input="validate()"
        class="form-control"
      />
    </div>
  </div>

  <div class="d-flex justify-content-between align-items-stretch gap-3 my-3">
    <Button
      iconName="add"
      :iconColor="MatColor.accent"
      :bgColor="MatColor.accent"
      @click="changeMode('inc')"
      class="flex-grow-1"
      :class="'inc' == mode ? 'mat-stroked' : 'mat-flat'"
    ></Button>
    <Button
      iconName="remove"
      :iconColor="MatColor.warn"
      :bgColor="MatColor.warn"
      @click="changeMode('dec')"
      class="flex-grow-1"
      :class="'dec' == mode ? 'mat-stroked' : 'mat-flat'"
    ></Button>
  </div>

  <div class="adjustment-grid gap-2">
    <Button
      v-for="v of options"
      :label="v+''"
      :iconColor="MatColor.dark"
      :bgColor="MatColor.dark"
      @click="changeBy(v)"
      class="flex-grow-1 mat-stroked"
    ></Button>
  </div>
</template>

<style lang="scss">
.adjustment-grid {
  display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    justify-items: stretch;
}
</style>
