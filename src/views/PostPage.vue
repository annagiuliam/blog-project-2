<template>
  <div>
    <PostContent :post="this.post" />
  </div>
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
