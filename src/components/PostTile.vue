<template>
  <v-card>
    <PostContent :post="post" :elip="elip" />
    <v-row>
      <SquareBtn @click="goToPost">lesen</SquareBtn>
    </v-row>
  </v-card>
</template>

<script>
import PostContent from "./PostContent.vue";
import SquareBtn from "./SquareBtn.vue";
export default {
  name: "PostTile",
  props: ["post", "elip"],
  components: {
    PostContent,
    SquareBtn,
  },
  methods: {
    goToPost() {
      this.$router.push({
        name: "post-page",
        params: { postId: this.post.id },
      });
    },
  },
};
</script>

<style></style>
