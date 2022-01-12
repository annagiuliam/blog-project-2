<template>
  <v-container>
    <GoBackBtn />
    <v-row class="mt-8">
      <v-col
        class="mx-auto"
        cols="11"
        md="10"
      >
        <v-card min-width="250px">
          <PostContent :post="post" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostContent from './../components/PostContent'
import GoBackBtn from './../components/GoBackBtn.vue'

export default {
  name: 'PostPage',
  components: { PostContent, GoBackBtn },
  props: {
    postId: { type: String, required: true }
  },
  computed: {
    post () {
      return this.$store.state.posts.find((post) => post.id === this.postId)
    }
  }
}
</script>

<style></style>
