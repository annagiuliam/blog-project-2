<template>
  <v-app>
    <InputDialog />
    <transition name="moveUp">
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
.moveUp-enter-active {
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

.moveUp-leave-active {
  animation: moveUp 0.3s eaase-in;
}
</style>
