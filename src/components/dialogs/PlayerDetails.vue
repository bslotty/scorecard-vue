<script lang="ts" setup>
import { Player } from "@/models/Player";
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";
import { useDialog } from "@/stores/dialog.store";
import { ref } from "vue";
import ScoreEdit from "../chunks/ScoreEdit.vue";

const $dialog = useDialog();

let valid = ref(false);
let player = $dialog.data.player as Player;

const name = defineModel("name", { required: true });
name.value = player.name;
let initialName = name.value;

function save() {
  if (valid.value) {
    player.name = name.value+"";
    initialName = player.name;
    validate()
  }
}

function close() {
  $dialog.close();
}

function validate() {
  let regex = new RegExp("[\\w\\-\\.\\@ !#$%^+]+", "gm");
    let m = (name.value as string).match(regex);
    valid.value = m !== null && name.value != initialName;
}

function remove() {
  $dialog.open("playerDelete");
}

function newScore() {
  player.addScore(0);
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center gap-5">
    <h2 >Player Details</h2>
    <div class="d-flex flex-nowrap gap-3">
      <Button
        iconName="delete"
        :iconColor="MatColor.warn"
        :bgColor="MatColor.transparent"
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

  <hr class="my-0" />

  <div class="d-flex flex-column justify-content-start">
    <label class="text-muted">Name</label>
    <div class="d-flex gap-2">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        @input="validate()"
        class="form-control"
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
    </div>
  </div>

  <div class="d-flex justify-content-between align-items-end gap-5 mt-4">
    <h4 class="flex-grow-1 text-muted">Scores</h4>
    <Button
      iconName="add"
      :iconColor="MatColor.accent"
      :bgColor="MatColor.transparent"
      @click="newScore()"
    ></Button>
  </div>
  <hr class="my-0" />

  <ScoreEdit
    v-for="(score, i) of player.ledger"
    :index="i"
    :player="player"
    :score="score"
  ></ScoreEdit>
</template>
