<template>
  <v-btn
    class="my-7 mx-auto"
    outlined
    :disabled="disabled"
    color="indigo"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'SquareBtn',
  props: ['disabled']
}
</script>
