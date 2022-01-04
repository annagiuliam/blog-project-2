<template>
  <v-container>
    <v-row class="mt-8">
      <v-col class="mx-auto" cols="11" md="10">
        <v-card min-width="250px">
          <PostContent :post="this.post" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostContent from "./../components/PostContent";
export default {
  name: "PostPage",
  props: {
    postId: { type: String, required: true },
  },
  computed: {
    post() {
      return this.$store.state.posts.find((post) => post.id === this.postId);
    },
  },
  components: { PostContent },
  created() {
    console.log(this.postId);
  },
};
</script>

<style></style>
