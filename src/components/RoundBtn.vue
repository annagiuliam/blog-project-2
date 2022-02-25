<template>
  <div style="position: relative">
    <Tooltip
      v-if="showTooltip"
      :class="tooltipClass"
    >
      {{ tooltipText }}
    </Tooltip>
    <v-btn
      outlined
      fab
      color="indigo"
      :x-small="xSmall"
      :small="small"
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
  props: ['tooltipText', 'tooltipClass', 'dataCmQa', 'xSmall', 'small'],
  data () {
    return {
      showTooltip: false
    }
  }
}
</script>
