<template>
  <v-container mb-6>
    <v-row class="mb-4 d-flex wrap justify-center align-center">
      <v-col :cols="cols" :sm="smallCols" :md="mediumCols">
        <v-select
          v-model="filters.category"
          @input="updateFilters"
          :items="categories"
          label="Nach Kategorie Sortieren"
          clearable
        ></v-select>
      </v-col>
      <v-col :cols="cols" :sm="smallCols" :md="mediumCols">
        <v-text-field
          v-model="filters.searchTerm"
          @input="updateFilters"
          clearable
          label="Begriff Suchen"
          append-icon="mdi-search"
        ></v-text-field>
      </v-col>
      <v-col
        class="d-flex justify-center"
        :cols="cols"
        :sm="smallCols"
        :md="mediumCols"
      >
        <v-btn
          text
          color="rgba(0, 0, 0, 0.6)"
          @click="sortByDate"
          class="custom-btn"
        >
          <v-icon class="mr-2">mdi-calendar-month-outline</v-icon>
          Nach Datum Sortieren
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-btn outlined color="indigo" @click="deleteAllPosts" class="mx-auto"
        >Alle Beiträge löschen</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      cols: 12,
      smallCols: 6,
      mediumCols: 4,
      filters: {
        category: "",
        date: false,
        searchTerm: "",
      },
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    updateFilters() {
      const finalFilters = { ...this.filters };
      this.$emit("updateFilters", finalFilters);
    },
    sortByDate() {
      this.filters.date = !this.filters.date;
      this.updateFilters();
    },
    deleteAllPosts() {
      this.$store.dispatch("deleteAllPosts");
    },
  },
};
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
