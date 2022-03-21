<template>
  <v-container>
    <v-row>
      <v-dialog
        :value="dialog"
        persistent
        max-width="800px"
        @click:outside="closeErrorDialog"
      >
        <v-card min-height="30vh">
          <v-container>
            <v-row justify="end">
              <RoundBtn
                data-cm-qa="close-btn"
                :tooltip-text="$gettext('close')"
                tooltip-class="left"
                x-small
                @click="closeErrorDialog"
              >
                <v-icon>mdi-close</v-icon>
              </RoundBtn>
            </v-row>
          </v-container>

          <v-card-title>
            {{ $gettext('Error') }}
          </v-card-title>
          <v-card-text>
            {{ errorMessage }}
          </v-card-text>
          <v-card-text>
            {{ $gettext('Please try again later') }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import RoundBtn from './RoundBtn.vue'
export default {
  name: 'ErrorDialog',
  components: { RoundBtn },

  computed: {
    dialog () {
      return this.$store.state.errorDialog
    },
    errorMessage () {
      return this.$store.state.errorMessage
    }
  },

  methods: {
    closeErrorDialog () {
      this.$store.dispatch('closeErrorDialog')
    }
  }
}
</script>
