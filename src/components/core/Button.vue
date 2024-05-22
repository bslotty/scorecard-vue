<script setup lang="ts">
import { MatColor } from "@/enums/mat_color";
import Icon from "./Icon.vue";

const props = defineProps<{
  label?: string;
  iconName?: string;
  iconColor: MatColor;
  bgColor: MatColor;
}>();

const bgClass = MatColor[props.bgColor];
const textClass = MatColor[props.iconColor];
</script>

<template>
  <button
    :class="bgClass"
  >
    <label
      v-if="label != ''"
      :class="textClass"
      >{{ label }}</label
    >
    <Icon
      v-if="iconName != undefined"
      :name="iconName"
      :color="iconColor"
    />
  </button>
</template>
