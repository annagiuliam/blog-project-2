<template>
  <v-app>
    <InputDialog />
    <router-view />
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
