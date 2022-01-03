<template>
  <v-app>
    <InputDialog />
    <PostDialog />

    <router-view />
  </v-app>
</template>

<script>
import InputDialog from "./components/InputDialog.vue";
import PostDialog from "./components/PostDialog.vue";

export default {
  name: "App",
  components: {
    InputDialog,
    PostDialog,
  },
};
</script>
