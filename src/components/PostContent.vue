<template>
  <v-container>
    <div v-if="post">
      <v-list-item three-line>
        <v-list-item-content
          class="overflow-visible"
          style="max-width: 100%"
        >
          <v-row class="d-flex justify-space-between align-center">
            <v-col>
              <div
                class="mb-1"
                :class="cathegoryFontSize"
              >
                {{ translatedCategories[post.category] }}
              </div>
            </v-col>
            <v-col class="d-flex justify-end align-center pa-1 mr-1">
              <RoundBtn
                data-cm-qa="delete-btn"
                :tooltip-text="$gettext('delete')"
                tooltip-class="top"
                x-small
                @click="deletePost"
              >
                <v-icon>mdi-delete-outline</v-icon>
              </RoundBtn>
              <RoundBtn
                data-cm-qa="edit-btn"
                :tooltip-text="$gettext('edit')"
                tooltip-class="top"
                x-small
                @click="editPost"
              >
                <v-icon>mdi-pencil</v-icon>
              </RoundBtn>
            </v-col>
          </v-row>
          <v-list-item-title
            class="text-h5 mb-1"
          >
            {{ post.title }}
          </v-list-item-title>
          <v-row justify="space-between">
            <v-col>
              <v-list-item-subtitle>{{ fullName }}</v-list-item-subtitle>
            </v-col>
            <v-col>
              <v-list-item-subtitle
                data-cm-qa="formatted-date"
                class="text-right"
              >
                {{
                  formattedDate
                }}
              </v-list-item-subtitle>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-card-text :class="textClass">
        {{ post.content }}
      </v-card-text>
    </div>
    <h1
      v-else
      data-cm-qa="fallback-text"
    >
      {{ $gettext('No post found') }}
    </h1>
  </v-container>
</template>

<script>
import RoundBtn from './RoundBtn.vue'
import categoriesGettex from './../helpers/categoriesGettext'
import axios from 'axios'

export default {
  name: 'PostContent',
  components: { RoundBtn },
  props: {
    post: {
      type: Object,
      default: null

    },
    elip: Boolean
  },
  data () {
    return {
      dateOptions: { year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  computed: {
    translatedCategories () {
      return categoriesGettex(this.$gettext)
    },
    formattedDate () {
      // need to convert date from JSON string got from database
      const parsedDate = new Date(this.post.creationDate)
      return parsedDate.toLocaleDateString(
        this.$language.current,
        this.dateOptions
      )
    },
    textClass () {
      const className = this.elip ? 'text-elip' : ''
      return className
    },
    cathegoryFontSize () {
      const className = this.elip ? 'text-overline' : 'cat-font-size'
      return className
    },
    fullName () {
      return `${this.post.firstName} ${this.post.middleName} ${this.post.lastName}`.trim()
    },
    password () {
      return this.$store.state.password
    }
  },
  methods: {
    async deletePost () {
      try {
        const res = await axios.delete(`${this.$store.state.serverUrl}${this.post.id}`, { headers: { Authorization: this.password } })
        console.log(res)
        this.$store.dispatch('deletePost', this.post.id)
      } catch (err) {
        this.$store.dispatch('handleError', err.message)
      }
    },
    editPost () {
      this.$store.dispatch('updateCurrentPost', this.post)
      this.$store.dispatch('openInputDialog')
    }
  }
}
</script>

<style>
.text-elip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cat-font-size {
  font-size: 2rem;
  text-transform: uppercase;
}
</style>
