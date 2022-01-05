<template>
  <v-card>
    <PostContent :post="post" :elip="elip" />
    <v-row>
      <v-btn
        class="mx-auto mb-3"
        outlined
        color="indigo"
        :to="{ name: 'post-page', params: { postId: post.id } }"
        >lesen
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
};
</script>

<style></style>
