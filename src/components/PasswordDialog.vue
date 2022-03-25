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
          <v-container v-if="authenticated">
            <v-card-text>
              {{ $gettext('You are already logged in') }}
            </v-card-text>
            <v-row justify="space-around">
              <SquareBtn @click="logout">
                {{ $gettext('Logout') }}
              </SquareBtn>
            </v-row>
          </v-container>
          <v-container v-if="authFail">
            <v-card-text>
              {{ $gettext('Password not valid: cannot complete request') }}
            </v-card-text>
            <v-row justify="space-around">
              <SquareBtn @click="retryPassword">
                {{ $gettext('Retry') }}
              </SquareBtn>
              <SquareBtn @click="closePasswordDialog">
                {{ $gettext('Close') }}
              </SquareBtn>
            </v-row>
          </v-container>
          <v-container v-if="!authenticated && !authFail">
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
                  <SquareBtn
                    @click="handleAuth"
                  >
                    {{ $gettext('Save') }}
                  </SquareBtn>
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
import SquareBtn from './SquareBtn.vue'
import axios from 'axios'
export default {
  name: 'PasswordDialog',
  components: { RoundBtn, SquareBtn },
  data () {
    return {
      password: '',
      authFail: false
    }
  },
  computed: {
    dialog () {
      return this.$store.state.passwordDialog
    },
    authenticated () {
      return !!this.$store.state.password
    }

  },

  methods: {
    async handleAuth () {
      try {
        await axios.post('login/', {}, { headers: { Authorization: this.password } })
        this.$store.dispatch('savePassword', this.password)
        this.closePasswordDialog()
      } catch (err) {
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
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
      this.authFail = false
      this.$store.dispatch('closePasswordDialog')
    },
    submitPassword () {
      this.$store.dispatch('sendProtectedRequest', this.password)
      this.$refs.form.reset()
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
