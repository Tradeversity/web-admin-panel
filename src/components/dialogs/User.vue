<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ formData.display_name }}
        </span>
      </v-card-title>
      <!-- <v-list>
        <v-list-tile v-for="descriptor in description">
          <v-list-tile-content>
            <v-list-tile-title>
              descriptor.title
            </v-list-tile-title>
            <v-list-tile-sub-title>
              descriptor.subTitle
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
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
        <v-btn block class="mb-4" @click.native.stop="banUser">
          ban
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UserDialog',
  data: () => ({
    confirm: '',
    fieldNames: [
      'name',
      'email',
    ],
  }),
  created () {
    this.$store.commit('ADD_DIALOG', this.$options.name)
  },
  computed: {
    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },

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
  },
  methods: {
    warnUser () {
      this.$store.dispatch('POST_WARN_USER', this.formData.id)
      this.$store.dispatch('GET_USERS')
      this.$store.dispatch('GET_FLAGGED_USERS')
      this.$store.commit('CLOSE_USER_DIALOG')
    },

    archiveUser () {
      this.$store.dispatch('POST_ARCHIVE_USER', this.formData.id)
      this.$store.dispatch('GET_USERS')
      this.$store.dispatch('GET_FLAGGED_USERS')
      this.$store.commit('CLOSE_USER_DIALOG')
    },

    banUser () {
      this.$store.dispatch('POST_BAN_USER', this.formData.id)
      this.$store.dispatch('GET_USERS')
      this.$store.dispatch('GET_FLAGGED_USERS')
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
