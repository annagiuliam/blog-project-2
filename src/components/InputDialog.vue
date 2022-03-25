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
              <RoundBtn
                data-cm-qa="close-btn"
                :tooltip-text="$gettext('close')"
                tooltip-class="left"
                small
                @click="closeInputDialog"
              >
                <v-icon>mdi-close</v-icon>
              </RoundBtn>
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
                        data-cm-qa="first-name-input"
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
                        data-cm-qa="middle-name-input"
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
                        data-cm-qa="last-name-input"
                        :label="$gettext('Last Name')"
                        counter="10"
                        :rules="[rules.lengthRule(10), rules.requiredRule]"
                      />
                    </v-col>
                    <v-col
                      :cols="cols"
                      :sm="smallCols"
                      :md="mediumCols"
                    >
                      <v-text-field
                        v-model="fullName"
                        data-cm-qa="full-name-input"
                        :label="$gettext('Full Name')"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="postData.email"
                        data-cm-qa="email-input"
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
                        data-cm-qa="category-input"
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
                        data-cm-qa="title-input"
                        :label="$gettext('Title')"
                        counter="60"
                        :rules="[rules.requiredRule, rules.lengthRule(60)]"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-textarea
                      v-model="postData.content"
                      data-cm-qa="content-input"
                      :label="$gettext('Content')"
                      outlined
                      auto-grow
                      row-height="40vh"
                      :rules="[rules.requiredRule]"
                    />
                  </v-row>

                  <v-row justify="end">
                    <v-btn
                      data-cm-qa="save-btn"
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
import RoundBtn from './RoundBtn.vue'
import axios from 'axios'
export default {
  name: 'InputDialog',
  components: { RoundBtn },
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
    // object containing the categories names and their translations
    categoriesGettext () {
      return categoriesGettext(this.$gettext)
    },
    // array containing the categories keys
    categories () {
      return Object.keys(this.categoriesGettext)
    },
    dialog () {
      return this.$store.state.inputDialog
    },
    currentPost () {
      return this.$store.state.currentPost
    },
    fullName: {
      get: function () {
        if (this.postData.middleName) {
          return `${this.postData.firstName} ${this.postData.middleName} ${this.postData.lastName}`.trim()
        } else {
          return `${this.postData.firstName} ${this.postData.lastName}`.trim()
        }
      },
      set: function (newValue) {
        if (newValue) {
          // filter falsy values like empty string
          const names = newValue.split(' ').filter(Boolean)

          switch (names.length) {
            case 1 : this.postData.firstName = names[0]
              this.postData.lastName = ''
              break
            case 2 :
              this.postData.middleName = ''
              this.postData.lastName = names[1]
              break
            case 3 : this.postData.middleName = names[1]
              this.postData.lastName = names[2]
              break
            default:
              // index 3 and all following are selected and joined on a space
              this.postData.lastName = names.splice(2).join(' ')
          }
        } else {
          this.postData.firstName = ''
          this.postData.middleName = ''
          this.postData.lastName = ''
        }
      }

    }

  },
  watch: {
    currentPost (newVal) {
      // if there is a currentPost and the inputDialog is open, you are editing the current post and you need to fill the form
      if (newVal && this.$store.state.inputDialog) {
        this.postData = { ...newVal }
      } else {
        // you do not need to edit the current post, so you can empty the form
        Object.keys(this.postData).forEach((ele) => (this.postData[ele] = ''))
      }
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
          // edit the current post in the store
          finalData = { ...this.postData }
          this.addEditedPost(finalData)
        } else {
          // it is a new post and you need to set date and id
          this.setPostId()
          this.setDate()
          finalData = { ...this.postData }
          this.addNewPost(finalData)
        }
        // this.closeInputDialog()
      }
    },
    async addNewPost (finalData) {
      try {
        // WRONG PATH!!!
        // await axios.post(`${finalData.id}`, finalData)
        // right path
        await axios.post(`posts/${finalData.id}`, finalData)
        this.$store.dispatch('addNewPost', finalData)
        this.closeInputDialog()
      } catch (err) {
        console.log(this.$store.state.currentPost)
        this.$store.dispatch('handleError', err.message)
      }
    },
    async addEditedPost (finalData) {
      try {
        // right path
        await axios.put(`posts/${finalData.id}`, finalData)
        // wrong path
        // await axios.put(`${finalData.id}`, finalData)
        this.$store.dispatch('editPost', finalData)
        this.closeInputDialog()
      } catch (err) {
        this.$store.dispatch('handleError', err.message)
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
