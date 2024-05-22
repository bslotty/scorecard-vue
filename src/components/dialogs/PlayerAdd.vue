<script lang="ts" setup>
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";
import { useDialog } from "@/stores/dialog.store";
import { usePlayerList } from "@/stores/player.store";
import { ref } from "vue";

const $dialog = useDialog();
const $players = usePlayerList();

let valid = ref(false);
const name = defineModel("name", { required: true, default: "Player" });

function save() {
  if (valid.value) {
    $players.add(name.value);
    close();
  }
}

function close() {
  $dialog.close();
}

function validate() {
  let regex = new RegExp("[\\w\\-\\.\\@ !#$%^+]+", "gm");
  let m = name.value.match(regex);
  valid.value = m !== null;
}
</script>
<template>
  <div class="d-flex justify-content-between align-items-center gap-5">
    <h2 >Add Player</h2>
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
  <div class="formControl d-flex flex-column justify-content-start">
    <label class="text-muted">Name</label>
    <input
      v-model="name"
      type="text"
      placeholder="Name"
      @input="validate()"
      class="form-control"
    />
  </div>
</template>
