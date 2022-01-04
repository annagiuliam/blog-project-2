<template>
  <v-container>
    <GoBackBtn />
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
import GoBackBtn from "./../components/GoBackBtn.vue";

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
  components: { PostContent, GoBackBtn },
  created() {
    console.log(this.$route);
  },
};
</script>

<style></style>
