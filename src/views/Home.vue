<template>
  <div>
    <v-container class="d-flex flex-column justify-center">
      <LanguageSelector style="width: 200px" />

      <SquareBtn @click="openInputDialog">
        <translate>New Post</translate>
      </SquareBtn>
      <div v-if="posts.length > 0">
        <Filters @updateFilters="updateFilters" />
      </div>
      <div v-else>
        <h1
          class="text-center"
        >
          <translate>There are no blog posts</translate>
        </h1>
      </div>
    </v-container>

    <v-container class="mb-5">
      <v-row wrap>
        <v-col
          v-for="post in filteredPosts"
          :key="post.id"
          cols="12"
          md="4"
        >
          <PostTile
            :post="post"
            :elip="true"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostTile from './../components/PostTile.vue'
import Filters from './../components/Filters.vue'
import SquareBtn from './../components/SquareBtn.vue'
import LanguageSelector from './../components/LanguageSelector.vue'
export default {
  name: 'Home',
  components: {
    Filters,
    PostTile,
    SquareBtn,
    LanguageSelector
  },
  data () {
    return {
      filters: null
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts
    },
    filteredPosts () {
      return this.filterPosts()
    }
  },
  methods: {
    openInputDialog () {
      this.$store.dispatch('openInputDialog')
    },

    updateFilters (finalFilters) {
      this.filters = { ...finalFilters }
      this.filterPosts()
    },
    filterPosts () {
      let tempPosts = [...this.posts]
      if (this.filters) {
        if (this.filters.category) {
          tempPosts = tempPosts.filter(
            (post) => post.category === this.filters.category
          )
        }
        if (this.filters.searchTerm) {
          tempPosts = tempPosts.filter((post) => {
            const searchPara = ['title', 'author', 'content']
            return searchPara.some((para) =>
              post[para]
                .toLowerCase()
                .includes(this.filters.searchTerm.toLowerCase())
            )
          })
        }
        if (this.filters.date) {
          tempPosts.sort((a, b) => b.creationDate - a.creationDate)
        }
      }
      return tempPosts
    }
  }
}
</script>

<style></style>
