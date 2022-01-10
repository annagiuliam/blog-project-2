<template>
  <div style="position: relative">
    <Tooltip v-if="showTooltip">{{ tooltipText }}</Tooltip>
    <v-btn
      outlined
      fab
      color="indigo"
      x-small
      class="ma-2"
      @click="$emit('click')"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <slot />
    </v-btn>
  </div>
</template>
<script>
import Tooltip from "./Tooltip.vue";

export default {
  data() {
    return {
      showTooltip: false,
    };
  },
  props: ["tooltipText"],
  components: { Tooltip },
};
</script>
