<template>
  <div>
    <div>{{ this.$route.params.id }}</div>
    <PostContent :post="post" />
  </div>
</template>

<script>
import PostContent from "./../components/PostContent";
export default {
  name: "PostPage",
  data() {
    return {
      postId: this.$route.params.id,
    };
  },
  computed: {
    post() {
      return this.$store.state.posts.find((post) => post.id === this.postId);
    },
  },
  components: { PostContent },
};
</script>

<style></style>
