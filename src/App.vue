<template>
  <v-app>
    <InputDialog />
    <PostDialog />

    <router-view />

    <!-- <router-link to="/test-page">See Post</router-link> -->
  </v-app>
</template>

<script>
import InputDialog from "./components/InputDialog.vue";
import PostDialog from "./components/PostDialog.vue";
// import PostTile from "./components/PostTile.vue";
// import Filters from "./components/Filters.vue";

export default {
  name: "App",
};
</script>
