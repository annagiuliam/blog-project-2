<template>
  <v-app>
    <InputDialog />
    <transition name="fade">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import InputDialog from './components/InputDialog.vue'

export default {
  name: 'App',
  components: {
    InputDialog
  },
  created () {
    this.$store.dispatch('getPosts')
  }
}
</script>
<style>
.fade-enter-active {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
