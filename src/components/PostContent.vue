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
                @click="deletePost"
              >
                <v-icon>mdi-delete-outline</v-icon>
              </RoundBtn>
              <RoundBtn
                data-cm-qa="edit-btn"
                :tooltip-text="$gettext('edit')"
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

export default {
  name: 'PostContent',
  components: { RoundBtn },
  props: {
    post: {
      type: Object,
      default: function () {
        return {}
      }
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
      return this.post.creationDate.toLocaleDateString(
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
    // currentPost () {
    //   return this.$store.state.currentPost
    // },

    fullName () {
      return `${this.post.firstName} ${this.post.middleName} ${this.post.lastName}`.trim()
    }
  },
  methods: {
    deletePost () {
      console.log('hello')
      this.$store.dispatch('deletePost', this.post)

      if (this.$route.name === 'post-page') {
        this.$router.push({ name: 'home' })
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
