<template>
  <v-app>
    <InputDialog />
    <transition name="fade">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import InputDialog from "./components/InputDialog.vue";

export default {
  name: "App",
  components: {
    InputDialog,
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
