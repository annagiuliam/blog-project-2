<template>
  <v-btn
    class="my-9 mx-auto"
    outlined
    color="indigo"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>
