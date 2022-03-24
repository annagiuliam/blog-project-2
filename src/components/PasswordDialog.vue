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
          <v-container v-if="authFail">
            <v-card-text>
              {{ $gettext('Password not valid: cannot complete request') }}
            </v-card-text>
            <v-row justify="space-around">
              <v-btn @click="retryPassword">
                Retry
              </v-btn>

              <v-btn @click="closePasswordDialog">
                Close
              </v-btn>
            </v-row>
          </v-container>
          <v-container v-else>
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
                  <v-btn @click="handleAuth">
                    {{ $gettext('Save') }}
                  </v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import RoundBtn from './RoundBtn.vue'
import axios from 'axios'
export default {
  name: 'PasswordDialog',
  components: { RoundBtn },
  data () {
    return {
      password: '',
      authFail: false
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
    async handleAuth () {
      console.log(this.password)
      try {
        const res = await axios.post('http://localhost:8000/login/', {}, { headers: { Authorization: this.password } })
        console.log(res)
        this.$store.dispatch('savePassword', this.password)
        console.log('dispatched')
        this.closePasswordDialog()
      } catch (err) {
        console.log(err.response)
        if (err.response.status === 401) {
          this.$refs.form.reset()
          this.authFail = true
        } else {
          this.$store.dispatch('handleError', err.message)
        }
      }
    },
    retryPassword () {
      this.authFail = false
    },
    closePasswordDialog () {
      console.log(this.$refs.form)
      if (this.$refs.form) {
        console.log('reset')
        this.$refs.form.reset()
      }

      this.authFail = false
      this.$store.dispatch('closePasswordDialog')
      // this.$store.dispatch('clearAuthData')
    },
    submitPassword () {
      this.$store.dispatch('sendProtectedRequest', this.password)
      this.$refs.form.reset()
      console.log(this.password)
    }
  }
}
</script>
