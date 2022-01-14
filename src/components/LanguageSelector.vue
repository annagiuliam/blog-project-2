
<template>
  <div>
    <!-- <v-select
      v-model="current"
      :items="availableLanguages"
      item-text="languageIcon"
      label="Outlined style"
      dense
      outlined
    >
      <template #item="{ item }">
        <Flag :code="item.code" />
      </template>
    </v-select> -->
    <select
      v-model="$language.current"
      name="language"
    >
      <option
        v-for="(language, key) in $language.available"
        :key="key"
        :value="key"
      >
        {{ language }}
      </option>
    </select>
  </div>
</template>
<script>

export default {

  data () {
    return {
      current: this.$language.current
    //   availableLanguages: Object.keys(this.$language.available).map(key => this.$language.available[key]),
    //   defaultLanguage: Object.keys(this.$language.available).find(key => key === this.language.current)
    }
  },
  computed: {

    availableLanguages () {
      return Object.keys(this.$language.available).map(key => this.$language.available[key])
    }
  },
  created () {
    console.log(this.$language)
    console.log(this.availableLanguages)
  }
}
</script>

<style>

</style>
