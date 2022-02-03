/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-prop-types */
<template>
  <v-card>
    <PostContent
      v-if="post"
      :post="post"
      :elip="elip"
    />
    <h1
      v-else
      data-cm-qa="fallback-text"
    >
      {{ $gettext('No post to display') }}
    </h1>
    <v-row>
      <SquareBtn
        data-cm-qa="read-btn"
        @click="goToPost"
      >
        {{ $gettext('read') }}
      </SquareBtn>
    </v-row>
  </v-card>
</template>

<script>
import PostContent from './PostContent.vue'
import SquareBtn from './SquareBtn.vue'
export default {
  name: 'PostTile',
  components: {
    PostContent,
    SquareBtn
  },
  props: ['post', 'elip'],
  methods: {
    goToPost () {
      this.$router.push({
        name: 'post-page',
        params: { postId: this.post.id }
      })
    }
  }
}
</script>

<style></style>
