<template>
  <v-app>
    <InputDialog />
    <ErrorDialog />
    <PasswordDialog />
    <transition name="fade">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
// import axios from 'axios'
import InputDialog from './components/InputDialog.vue'
import ErrorDialog from './components/ErrorDialog.vue'
import PasswordDialog from './components/PasswordDialog.vue'

export default {
  name: 'App',
  components: {
    InputDialog, ErrorDialog, PasswordDialog
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
