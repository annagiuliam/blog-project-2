<template>
  <div style="position: relative">
    <Tooltip
      v-if="showTooltip"
      class="top"
    >
      {{ tooltipText }}
    </Tooltip>
    <v-btn
      outlined
      fab
      color="indigo"
      x-small
      class="ma-2"
      :data-cm-qa="dataCmQa"
      @click="$emit('click')"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <slot />
    </v-btn>
  </div>
</template>
<script>
import Tooltip from './Tooltip.vue'

export default {
  components: { Tooltip },
  props: ['tooltipText', 'dataCmQa'],
  data () {
    return {
      showTooltip: false
    }
  }
}
</script>
