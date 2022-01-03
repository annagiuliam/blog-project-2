<template>
  <div class="text-center">
    <v-dialog :value="dialog" width="500" @click:outside="closePostDialog">
      <v-card>
        <PostContent v-if="currentPost" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PostContent from "./PostContent.vue";
export default {
  computed: {
    dialog() {
      return this.$store.state.postDialog;
    },
    currentPost() {
      return this.$store.state.currentPost;
    },
  },
  components: {
    PostContent,
  },
  props: ["post"],
  methods: {
    closePostDialog() {
      this.$store.dispatch("closePostDialog");
    },
  },
};
</script>

<style></style>
