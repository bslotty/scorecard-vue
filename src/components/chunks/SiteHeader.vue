<script setup lang="ts">
import Button from "../core/Button.vue";
import { MatColor } from "@/enums/mat_color";
import { EventActions } from "@/enums/event_actions";
import { useDialog } from "@/stores/dialog.store";

const $dialog = useDialog();

function ButtonClick(action: EventActions) {
  switch (action) {
    case EventActions.refresh:
      $dialog.open("reset");
      break;

    case EventActions.add:
      $dialog.open("playerAdd");
      break;
  }
}
</script>

<template>
  <div class="d-flex flex-row gap-2 justify-content-between align-items-center flex-grow-1">
    <div>
      <h1 class="">Scorecard</h1>
    </div>

    <div class="d-flex justify-items-end align-items-end gap-3">
      <Button
        @click="ButtonClick(EventActions.refresh)"
        :bgColor="MatColor.light"
        :iconColor="MatColor.warn"
        iconName="refresh"
      ></Button>
      <Button
        @click="ButtonClick(EventActions.add)"
        :bgColor="MatColor.light"
        :iconColor="MatColor.accent"
        iconName="person_add"
      ></Button>
    </div>
  </div>
</template>
