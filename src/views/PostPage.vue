<template>
  <v-container>
    <!-- <GoBackBtn /> -->
    <RoundBtn
      data-cm-qa="go-back-btn"
      :tooltip-text="$gettext('go back')"
      tooltip-class="right"
      @click="goBack"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </RoundBtn>
    <v-row class="mt-8">
      <v-col
        class="mx-auto"
        cols="11"
        md="10"
      >
        <v-card
          min-width="250px"
        >
          <PostContent
            v-if="post"
            :post="post"
          />
          <h1
            v-else
            data-cm-qa="fallback-text"
          >
            {{ $gettext('No post found') }}
          </h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostContent from './../components/PostContent'
// import GoBackBtn from './../components/GoBackBtn.vue'
import RoundBtn from '../components/RoundBtn.vue'

export default {
  name: 'PostPage',
  components: { PostContent, RoundBtn },
  props: {
    postId: { required: true }
  },
  computed: {
    post () {
      return this.$store.state.posts.find((post) => post.id === this.postId)
    }
  },
  methods: {
    goBack () {
      return this.$router.back()
    }
  }
}
</script>

<style></style>
