
<template>
  <div>
    <v-select
      v-model="$language.current"
      :items="languagesKeys"
    >
      <template #item="{item}">
        <Flag
          :code="languagesObj[item].code"
          style="margin-right: 1rem"
        />
        {{ '  ' + languagesObj[item].name }}
      </template>
      <template #selection="{item}">
        <Flag
          :code="languagesObj[item].code"
          style="margin-right: 1rem"
        />
        {{ '  ' + languagesObj[item].name }}
      </template>
    </v-select>
  </div>
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
