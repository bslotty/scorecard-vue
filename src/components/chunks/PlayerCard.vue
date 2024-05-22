<script setup lang="ts">
import { EventActions } from "@/enums/event_actions";
import { Player } from "@/models/Player";
import { MatColor } from "@/enums/mat_color";

import Button from "../core/Button.vue";
import Icon from "../core/Icon.vue";
import { useDialog } from "@/stores/dialog.store";

const $dialog = useDialog();

const props = defineProps<{
  player: Player;
  place: number;
}>();

function buttonClick(action: EventActions) {
  switch (action) {
    case EventActions.add:
      $dialog.setData({ player: props.player });
      $dialog.open("scoreAdd");
      break;

    case EventActions.edit:
      $dialog.setData({ player: props.player });
      $dialog.open("playerEdit");
      break;
  }
}
</script>

<template>

    <div class="player-card">
      <div class="gap-4 card player border border-bottom-2 border-0 border-dark">
        <div class="col-1 s-center">
          <Icon
            v-if="place == 0"
            name="trophy"
            :color="MatColor.light"
            class="trophy"
          ></Icon>
          <span
            v-if="place > 0"
            class="text-muted font-weight-bold"
            ><strong>{{ place + 1 }}</strong></span
          >
        </div>

        <div class="f-row flex-grow-1 j-between wrap">
          <label>{{ player.name }}</label>
          <label :class="player.currentScore < 0 ? 'warn' : ''"
            ><strong>{{ player.currentScore }}</strong></label
          >
        </div>

        <div class="d-flex flex-row align-items-end gap-3">
          <Button
            @click="buttonClick(EventActions.add)"
            :bgColor="MatColor.light"
            :iconColor="MatColor.accent"
            iconName="add"
          ></Button>

          <Button
            @click="buttonClick(EventActions.edit)"
            :bgColor="MatColor.light"
            :iconColor="MatColor.primary"
            iconName="settings"
          ></Button>
        </div>
      </div>
      <hr class="my-2" />
    </div>
</template>
