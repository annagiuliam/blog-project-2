<template>
  <v-container mb-6>
    <v-row class="mb-4 d-flex wrap justify-center align-center">
      <v-col
        :cols="cols"
        :sm="smallCols"
        :md="mediumCols"
      >
        <v-select
          v-model="filters.category"
          :items="categories"
          :label="$gettext('Sort by category')"
          clearable
          @input="updateFilters"
        />
      </v-col>
      <v-col
        :cols="cols"
        :sm="smallCols"
        :md="mediumCols"
      >
        <v-text-field
          v-model="filters.searchTerm"
          clearable
          :label="$gettext('Search term')"
          append-icon="mdi-search"
          @input="updateFilters"
        />
      </v-col>
      <v-col
        class="d-flex justify-center"
        :cols="cols"
        :sm="smallCols"
        :md="mediumCols"
      >
        <v-btn
          v-translate
          text
          color="rgba(0, 0, 0, 0.6)"
          class="custom-btn"
          @click="sortByDate"
        >
          <v-icon class="mr-2">
            mdi-calendar-month-outline
          </v-icon>
          Sort by date
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <SquareBtn
        v-translate
        @click="deleteAllPosts"
      >
        Delet all posts
      </SquareBtn>
    </v-row>
  </v-container>
</template>

<script>
import SquareBtn from './SquareBtn.vue'
export default {
  name: 'Filters',
  components: { SquareBtn },
  data () {
    return {
      cols: 12,
      smallCols: 6,
      mediumCols: 4,
      filters: {
        category: '',
        date: false,
        searchTerm: ''
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    updateFilters () {
      const finalFilters = { ...this.filters }
      this.$emit('updateFilters', finalFilters)
    },
    sortByDate () {
      this.filters.date = !this.filters.date
      this.updateFilters()
    },
    deleteAllPosts () {
      this.$store.dispatch('deleteAllPosts')
    }
  }
}
</script>

<style>
.v-btn.custom-btn {
  font-family: "Roboto", sans-serif;
  letter-spacing: normal;
  font-weight: 400;
  font-size: 16px;
  text-transform: none;
}
</style>
