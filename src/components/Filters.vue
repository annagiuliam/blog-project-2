<template>
  <v-container
    mb-6
    data-cm-qa="filters-container"
  >
    <v-row class="mb-4 d-flex wrap justify-center align-center">
      <v-col
        :cols="cols"
        :sm="smallCols"
        :md="mediumCols"
      >
        <v-select
          v-model="filters.category"
          data-cm-qa="category-select"
          :items="categories"
          :label="$gettext('Sort by category')"
          clearable
          @input="updateFilters"
        >
          <template #item="{item}">
            {{ categoriesGettext[item] }}
          </template>
          <template #selection="{item}">
            {{ categoriesGettext[item] }}
          </template>
        </v-select>
      </v-col>
      <v-col
        :cols="cols"
        :sm="smallCols"
        :md="mediumCols"
      >
        <v-text-field
          v-model="filters.searchTerm"
          data-cm-qa="term-input"
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
        :md="3"
      >
        <v-btn
          text
          color="rgba(0, 0, 0, 0.6)"
          class="custom-btn"
          data-cm-qa="date-btn"
          @click="sortByDate"
        >
          <v-icon class="mr-2">
            mdi-calendar-month-outline
          </v-icon>
          {{ $gettext('Sort by date') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <SquareBtn
        data-cm-qa="delete-all-btn"
        :disabled="!$store.state.password"
        @click="deleteAllPosts"
      >
        {{ $gettext('Delete all posts') }}
      </SquareBtn>
    </v-row>
  </v-container>
</template>

<script>
import SquareBtn from './SquareBtn.vue'
import categoriesGettext from './../helpers/categoriesGettext'
import axios from 'axios'
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
      return Object.keys(this.categoriesGettext)
    },
    categoriesGettext () {
      return categoriesGettext(this.$gettext)
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
    async deleteAllPosts () {
      try {
        // right path
        await axios.delete('posts/')
        // wrong path
        // await axios.delete('/')
        this.$store.dispatch('deleteAllPosts')
      } catch (err) {
        this.$store.dispatch('handleError', err.message)
      }
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
