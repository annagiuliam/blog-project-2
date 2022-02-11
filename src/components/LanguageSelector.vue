
<template>
  <v-select
    v-model="$language.current"
    data-cm-qa="language-selector"
    :items="languagesKeys"
  >
    <template #item="{item}">
      <!-- Flag is not a vuetify component, therefore margin needs to be added with style  -->
      <Flag
        :code="languagesObj[item].code"
        style="margin-right: 1rem"
      />
      {{ languagesObj[item].name }}
    </template>
    <template #selection="{item}">
      <Flag
        :code="languagesObj[item].code"
        style="margin-right: 1rem"
      />
      {{ languagesObj[item].name }}
    </template>
  </v-select>
</template>
<script>

export default {

  computed: {
    languagesKeys () {
      return Object.keys(this.$language.available)
    },
    languagesObj () {
      return this.$language.available
    }
  }

}
</script>

<style>

</style>
