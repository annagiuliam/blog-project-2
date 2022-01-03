<template>
  <v-container>
    <v-row>
      <v-dialog
        :value="dialog"
        persistent
        max-width="800px"
        @click:outside="closeInputDialog"
      >
        <v-card min-height="90vh">
          <v-container>
            <v-row justify="end">
              <v-btn
                class="ma-2"
                outlined
                fab
                small
                color="indigo"
                @click="closeInputDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-container>

          <v-card-title>
            <span v-if="this.currentPost" class="text-h5"
              >Beitrag Bearbeiten</span
            >
            <span v-else class="text-h5">Neuer Beitrag</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-container fluid>
                  <v-row align="center">
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="postData.author"
                        label="Authorenname"
                        required
                        :rules="inputRules"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="categories"
                        label="Kategorie"
                        v-model="postData.category"
                        required
                        :rules="inputRules"
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="postData.title"
                        label="Titel"
                        required
                        :rules="inputRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-textarea
                      label="Inhalt"
                      outlined
                      auto-grow
                      v-model="postData.content"
                      row-height="40vh"
                      required
                      :rules="inputRules"
                    ></v-textarea>
                  </v-row>
                  <v-row justify="end">
                    <v-btn @click="sendMessage">Speichern</v-btn>
                  </v-row>
                </v-container>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "InputDialog",
  data() {
    return {
      inputRules: [(v) => !!v || "Inhalt fehlt"],
      postData: {
        author: "",
        category: "",
        date: "",
        title: "",
        content: "",
        id: "",
      },
    };
  },

  computed: {
    categories() {
      return this.$store.state.categories;
    },
    dialog() {
      return this.$store.state.inputDialog;
    },
    currentPost() {
      return this.$store.state.currentPost;
    },
  },
  watch: {
    currentPost(newVal) {
      if (newVal && this.$store.state.inputDialog) {
        this.postData = { ...newVal };
      } else {
        Object.keys(this.postData).forEach((ele) => (this.postData[ele] = ""));
        // this.$refs.form.reset();
        // this.postData.date = null;
        // this.postData.id = null;
      }
      console.log(this.postData);
    },
  },
  methods: {
    setPostId() {
      this.postData.id =
        this.postData.author.slice(0, 1) +
        this.postData.author.slice(-1) +
        Date.now();
    },
    setDate() {
      this.postData.date = new Date();
    },
    sendMessage() {
      const formValid = this.$refs.form.validate();
      if (formValid) {
        let finalData;
        if (this.$store.state.currentPost) {
          finalData = { ...this.postData };
          this.$store.dispatch("editPost", finalData);
          // after you edit the post, if PostDialog is open update the currentPost so it can be displayed in the PostDialog
          if (this.$store.state.postDialog) {
            this.$store.dispatch("updateCurrentPost", finalData);
          } else {
            this.$store.dispatch("clearCurrentPost");
          }
        } else {
          // it is a new post and you need to set date and id
          this.setPostId();
          this.setDate();
          finalData = { ...this.postData };
          this.$store.dispatch("addNewPost", finalData);
          console.log(finalData);
        }
        this.closeInputDialog();
        this.$refs.form.reset();
      }
    },
    closeInputDialog() {
      this.$store.dispatch("closeInputDialog");
      // if PostDialog is not open you don't need currentPost
      if (!this.$store.state.postDialog) {
        this.$store.dispatch("clearCurrentPost");
      }
    },
  },
};
</script>

<style></style>
