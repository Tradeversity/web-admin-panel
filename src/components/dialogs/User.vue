<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-row class="primary">
        <v-card-title class="white--text">
          {{ formData.display_name }}
        </v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text class="text-xs-left">
          <v-btn
            block
            class="mb-4"
            v-if="isFlagged"
            @click.native.stop="flagUser"
          >
            {{ isFlagged ? 'unflag' : 'flag'}}
          </v-btn>
          <v-btn block class="mb-4" @click.native.stop="warnUser">
            warn
          </v-btn>
          <!--<v-btn block class="mb-4" @click.native.stop="archiveUser">
            archive
          </v-btn>-->
          <v-btn block class="mb-4" @click.native.stop="banUser">
            ban
          </v-btn>
          <!--<v-btn block @click.native.stop="deleteUser">
            delete
          </v-btn>-->
        </v-card-text>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
// import validateEmail from '@/services/validateEmail'

export default {
  name: 'UserDialog',
  data () {
    return {
      snackbar: false,
      confirm: '',
      isLoading: false,
      fieldNames: [
        'name',
        'email',
      ],
    }
  },
  computed: {
    formState () {
      let state = {}

      this.fieldNames.map(name => {
        state[name] = {
          hint: '',
          error: false,
        }
      })

      state.form = 'info'
      state.snackMessage = 'Add event'

      // console.log('state', state)

      return state
    },

    formData: {
      get () {
        return this.$store.state.selectedUser
      },

      set (value) {
        // this.$store.commit('SET_NEW_USER', this.formData)
        // console.log(this.$store.state.selectedUser, value)
      }
    },

    isFlagged () {
      return this.$store.state.selectedUser.isFlagged || false
    },

    isOpen: {
      get () {
        return this.$store.state.isUserDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_USER_DIALOG')
        }
      }
    }
  },
  methods: {
    warnUser () {
      this.$store.dispatch('POST_WARN_USER', this.formData.id)
      this.$store.commit('CLOSE_USER_DIALOG')
    },

    archiveUser () {
      this.$store.dispatch('POST_ARCHIVE_USER', this.formData.id)
      this.$store.commit('CLOSE_USER_DIALOG')
    },

    banUser () {
      this.$store.dispatch('POST_BAN_USER', this.formData.id)
      this.$store.commit('CLOSE_USER_DIALOG')
    },

    // deleteUser () {
    //   this.$store.dispatch('POST_DELETE_USER', this.formData.id)

    //   this.$store.commit('CLOSE_USER_DIALOG')
    // },

    flagUser () {
      if (this.isFlagged) {
        this.$store.dispatch('POST_UNFLAG_USER', this.formData.id)
        this.$store.dispatch('GET_FLAGGED_USERS')
      }

      this.$store.commit('CLOSE_USER_DIALOG')
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
