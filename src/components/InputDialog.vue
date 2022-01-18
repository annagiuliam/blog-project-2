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
            <span
              v-if="currentPost"
              class="text-h5"
            >{{ $gettext('Edit Post') }}</span>
            <span
              v-else
              class="text-h5"
            >{{ $gettext('New Post') }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-container fluid>
                  <v-row align="center">
                    <v-col
                      :cols="cols"
                      :sm="smallCols"
                      :md="mediumCols"
                    >
                      <!-- <v-text-field
                        v-model="postData.author"
                        label="Authorenname"
                        required
                        :rules="inputRules"
                      ></v-text-field> -->

                      <v-text-field
                        v-model="postData.firstName"
                        :label="$gettext('First Name')"
                        counter="10"
                        :rules="[rules.requiredRule, rules.lengthRule(10)]"
                      />
                    </v-col>

                    <v-col
                      :cols="cols"
                      :sm="smallCols"
                      :md="mediumCols"
                    >
                      <v-text-field
                        v-model="postData.middleName"
                        :label="$gettext('Middle Name')"
                        counter="10"
                        :rules="[rules.lengthRule(10)]"
                      />
                    </v-col>

                    <v-col
                      :cols="cols"
                      :sm="smallCols"
                      :md="mediumCols"
                    >
                      <v-text-field
                        v-model="postData.lastName"
                        :label="$gettext('Last Name')"
                        counter="10"
                        :rules="[rules.lengthRule(10)]"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="postData.email"
                        type="email"
                        :label="$gettext('E-mail')"
                        :rules="[rules.requiredRule, rules.emailRule]"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-select
                        v-model="postData.category"
                        :items="categories"
                        :label="$gettext('Category')"
                        :rules="[rules.requiredRule]"
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
                      cols="12"
                      sm="8"
                    >
                      <v-text-field
                        v-model="postData.title"
                        :label="$gettext('Title')"
                        counter="60"
                        :rules="[rules.requiredRule, rules.lengthRule(60)]"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-textarea
                      v-model="postData.content"
                      :label="$gettext('Content')"
                      outlined
                      auto-grow
                      row-height="40vh"
                      :rules="[rules.requiredRule]"
                    />
                  </v-row>

                  <v-row justify="end">
                    <v-btn
                      @click="sendMessage"
                    >
                      {{ $gettext('Save') }}
                    </v-btn>
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
import categoriesGettext from './../helpers/categoriesGettext'
export default {
  name: 'InputDialog',
  data () {
    return {
      cols: 12,
      smallCols: 6,
      mediumCols: 4,
      rules: {
        requiredRule: (v) => !!v || this.$gettext('Content missing'),
        lengthRule: (length) => {
          return (v) =>
            !v || v.length <= length || this.$gettext('Max. number of characters reached')
        },
        emailRule: (v) => {
          const pattern = /^\S+@\S+$/ // @ sign preceded and followed by one or more non-whitespace characters
          return pattern.test(v) || this.$gettext('Invalid e-mail.')
        }
      },

      postData: {
        // author: "",
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        category: '',
        title: '',
        content: '',
        // these are not connected to the form with v-model
        creationDate: '',
        id: ''
      }
    }
  },

  computed: {

    categories () {
      return Object.keys(this.categoriesGettext)
    },
    categoriesGettext () {
      return categoriesGettext(this.$gettext)
    },
    dialog () {
      return this.$store.state.inputDialog
    },
    currentPost () {
      return this.$store.state.currentPost
    }
  },
  watch: {
    currentPost (newVal) {
      if (newVal && this.$store.state.inputDialog) {
        this.postData = { ...newVal }
      } else {
        Object.keys(this.postData).forEach((ele) => (this.postData[ele] = ''))
      }
      console.log(this.postData)
    }
  },
  methods: {
    setPostId () {
      this.postData.id =
        this.postData.firstName.slice(0, 1) +
        this.postData.firstName.slice(-1) +
        Date.now()
    },
    setDate () {
      this.postData.creationDate = new Date()
    },
    sendMessage () {
      const formValid = this.$refs.form.validate()
      if (formValid) {
        let finalData
        if (this.$store.state.currentPost) {
          finalData = { ...this.postData }
          this.$store.dispatch('editPost', finalData)
          this.$store.dispatch('clearCurrentPost')
        } else {
          // it is a new post and you need to set date and id
          this.setPostId()
          this.setDate()
          finalData = { ...this.postData }
          this.$store.dispatch('addNewPost', finalData)
          console.log(finalData)
        }
        this.closeInputDialog()
      }
    },
    closeInputDialog () {
      this.$store.dispatch('closeInputDialog')
      this.$store.dispatch('clearCurrentPost')
      this.$refs.form.reset()
    }
  }
}
</script>

<style></style>
