<template>
  <v-row>
    <v-btn outlined fab color="indigo" class="ma-2" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: "GoBackBtn",
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style></style>
