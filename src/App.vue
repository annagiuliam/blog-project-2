<template>
  <v-app>
    <InputDialog />
    <PostDialog />

    <v-container class="d-flex flex-column justify-center">
      <v-btn
        class="my-9 mx-auto"
        outlined
        color="indigo"
        @click="openInputDialog"
      >
        Neuer Beitrag
      </v-btn>
      <div v-if="posts.length > 0">
        <Filters @updateFilters="updateFilters" />
      </div>
      <div v-else>
        <h1 class="text-center">Es gibt noch keine Blogbeiträge</h1>
      </div>
    </v-container>

    <v-container class="mb-5">
      <v-row wrap>
        <v-col cols="12" md="4" v-for="post in filteredPosts" :key="post.id">
          <PostTile :post="post" :elip="true" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import InputDialog from "./components/InputDialog.vue";
import PostDialog from "./components/PostDialog.vue";
import PostTile from "./components/PostTile.vue";
import Filters from "./components/Filters.vue";

export default {
  name: "App",
  data() {
    return {
      filters: null,
    };
  },
  components: {
    InputDialog,
    PostDialog,
    Filters,
    PostTile,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    filteredPosts() {
      return this.filterPosts();
    },
  },
  methods: {
    openInputDialog() {
      this.$store.dispatch("openInputDialog");
    },

    updateFilters(finalFilters) {
      this.filters = { ...finalFilters };
      this.filterPosts();
    },
    filterPosts() {
      let tempPosts = [...this.posts];
      if (this.filters) {
        if (this.filters.category) {
          tempPosts = tempPosts.filter(
            (post) => post.category === this.filters.category
          );
        }
        if (this.filters.searchTerm) {
          tempPosts = tempPosts.filter((post) => {
            const searchPara = ["title", "author", "content"];
            return searchPara.some((para) =>
              post[para]
                .toLowerCase()
                .includes(this.filters.searchTerm.toLowerCase())
            );
          });
        }
        if (this.filters.date) {
          tempPosts.sort((a, b) => b.date - a.date);
        }
      }
      return tempPosts;
    },
  },
};
</script>
