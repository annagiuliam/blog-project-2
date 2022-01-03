<template>
  <v-container>
    <v-list-item three-line>
      <v-list-item-content>
        <v-row class="d-flex justify-space-between align-center">
          <v-col>
            <div class="text-overline mb-1">
              {{ displayedPost.category }}
            </div></v-col
          >
          <v-col class="d-flex justify-end align-center pa-1">
            <v-btn
              outlined
              fab
              color="indigo"
              x-small
              @click="deletePost"
              class="ma-2"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>

            <v-btn
              outlined
              fab
              color="indigo"
              x-small
              class="ma-2"
              @click="editPost"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn
              class="ma-2"
              outlined
              fab
              x-small
              color="indigo"
              @click="closePostDialog"
              v-if="!elip"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-list-item-title class="text-h5 mb-1">
          {{ displayedPost.title }}
        </v-list-item-title>
        <v-row justify="space-between">
          <v-col>
            <v-list-item-subtitle>{{
              displayedPost.author
            }}</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="text-right">{{
              this.formattedDate
            }}</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-card-text :class="textClass">{{ displayedPost.content }}</v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "PostContent",
  data() {
    return {
      dateOptions: { year: "numeric", month: "long", day: "numeric" },
    };
  },
  props: ["post", "elip"],
  computed: {
    formattedDate() {
      return this.displayedPost.date.toLocaleDateString(
        undefined,
        this.dateOptions
      );
    },
    textClass() {
      let className = this.elip ? "text-elip" : "";
      return className;
    },
    currentPost() {
      return this.$store.state.currentPost;
    },
    displayedPost() {
      return this.post ? this.post : this.currentPost;
    },
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", this.displayedPost);
      if (this.$store.state.postDialog) {
        this.closePostDialog();
      }
    },
    closePostDialog() {
      this.$store.dispatch("closePostDialog");
    },
    editPost() {
      this.$store.dispatch("updateCurrentPost", this.displayedPost);
      this.$store.dispatch("openInputDialog");
    },
  },
};
</script>

<style>
.text-elip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
