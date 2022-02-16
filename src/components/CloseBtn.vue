<template>
  <div style="position: relative">
    <Tooltip
      v-if="showTooltip"
      class="left"
    >
      {{ $gettext('close') }}
    </Tooltip>
    <v-btn
      :data-cm-qa="dataCmQa"
      class="ma-2"
      outlined
      fab
      small
      color="indigo"
      @click="$emit('click')"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Tooltip from './Tooltip.vue'
export default {
  name: 'CloseBtn',
  components: { Tooltip },
  props: ['tooltipText', 'dataCmQa'],
  data () {
    return {
      showTooltip: false
    }
  }

}
</script>
