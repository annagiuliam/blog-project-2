<template>
  <v-btn
    outlined
    fab
    color="indigo"
    x-small
    class="ma-2"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>
