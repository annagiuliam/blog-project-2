<template>
  <v-card>
    <PostContent :post="post" :elip="elip" />
    <v-row>
      <v-btn class="mx-auto mb-3" outlined color="indigo">
        <router-link :to="{ name: 'post-page', params: { id: post.id } }"
          >read</router-link
        >
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import PostContent from "./PostContent.vue";
export default {
  name: "PostTile",
  props: ["post", "elip"],
  components: {
    PostContent,
  },
  // methods: {
  //   openPostDialog() {
  //     this.$store.dispatch("updateCurrentPost", this.post);
  //     this.$store.dispatch("openPostDialog");
  //   },
  //   updateCurrentPost() {
  //     this.$store.dispatch("updateCurrentPost", this.post);
  //     console.log("updated current post");
  //   },
  // },
};
</script>

<style></style>
