<template>
  <v-row>
    <div style="position: relative">
      <Tooltip
        v-if="showTooltip"
        class="location"
      >
        {{ $gettext('go back') }}
      </Tooltip>
      <v-btn
        outlined
        fab
        color="indigo"
        class="ma-2"
        @click="goBack"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import Tooltip from './Tooltip.vue'
export default {
  name: 'GoBackBtn',
  components: { Tooltip },
  data () {
    return {
      showTooltip: false
    }
  },
  methods: {
    goBack () {
      return this.$router.back()
    }
  }

}
</script>
<style scoped>
.location {
  top: 25%;
  left: 110%;
  width: 5rem;
  transform: none
}
</style>
