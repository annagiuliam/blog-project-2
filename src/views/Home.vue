<template>
  <div>
    <v-container class="d-flex flex-column justify-center">
      <v-row>
        <v-col cols="10">
          <LanguageSelector style="width: 200px" />
        </v-col>
        <v-col
          cols="2"
        >
          <RoundBtn
            data-cm-qa="
          delete-btn"
            :tooltip-text="$gettext('login')"
            tooltip-class="left"
            small
            @click="openPasswordDialog"
          >
            <v-icon>mdi-key</v-icon>
          </RoundBtn>
        </v-col>
      </v-row>

      <SquareBtn
        data-cm-qa="add-new-btn"
        :disabled="disabled"
        @click="openInputDialog"
      >
        {{ $gettext('New Post') }}
      </SquareBtn>
      <div v-if="posts.length > 0">
        <Filters @updateFilters="updateFilters" />
      </div>
      <div v-else>
        <h1
          class="text-center"
        >
          {{ $gettext('There are no blog posts') }}
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
import RoundBtn from './../components/RoundBtn.vue'
import LanguageSelector from './../components/LanguageSelector.vue'
export default {
  name: 'Home',
  components: {

    Filters,
    PostTile,
    SquareBtn,
    RoundBtn,
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
    },
    disabled () {
      console.log(!!this.$store.state.password)
      return !this.$store.state.password
    }
  },
  methods: {
    openInputDialog () {
      this.$store.dispatch('openInputDialog')
    },
    openPasswordDialog () {
      this.$store.dispatch('openPasswordDialog')
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
            const searchPara = ['title', 'content', 'firstName', 'middleName', 'lastName']
            return searchPara.some((para) =>
              post[para]
                .toLowerCase()
                .includes(this.filters.searchTerm.toLowerCase())
            )
          })
        }
        if (this.filters.date) {
          tempPosts.sort((a, b) => {
            // need to convert from date string into new date
            const dateA = new Date(a.creationDate)
            const dateB = new Date(b.creationDate)
            return dateB - dateA
          })
        }
      }
      return tempPosts
    }
  }
}
</script>

<style></style>
