<template>
  <v-container>
    <v-row>
      <v-dialog
        :value="dialog"
        persistent
        max-width="800px"
        @click:outside="closePasswordDialog"
      >
        <v-card min-height="30vh">
          <v-container>
            <v-row justify="end">
              <RoundBtn
                data-cm-qa="close-btn"
                :tooltip-text="$gettext('close')"
                tooltip-class="left"
                x-small
                @click="closePasswordDialog"
              >
                <v-icon>mdi-close</v-icon>
              </RoundBtn>
            </v-row>
          </v-container>
          <v-card-title>
            {{ $gettext('Please enter your password') }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row justify="center">
                <v-col cols="8">
                  <v-text-field
                    v-model="password"
                    type="password"
                    :label="$gettext('Password')"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn @click="submitPassword">
                  {{ $gettext('Save') }}
                </v-btn>
              </v-row>
              <v-form />
            </v-form>
          </v-card-text>

          <v-card-text>
            {{ $gettext('Password not valid: cannot complete request') }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import RoundBtn from './RoundBtn.vue'
export default {
  name: 'PasswordDialog',
  components: { RoundBtn },
  data () {
    return {
      password: ''
    }
  },
  computed: {
    dialog () {
      return this.$store.state.passwordDialog
    }
  },

  mounted () {

  },

  methods: {
    closePasswordDialog () {
      this.$store.dispatch('closePasswordDialog')
    },
    submitPassword () {
      this.$store.dispatch('sendProtectedRequest', this.password)
      console.log(this.password)
    }
  }
}
</script>
