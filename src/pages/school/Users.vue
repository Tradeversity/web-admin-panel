<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>

    <v-card-title>
      <span class="headline">{{ title }}</span>

      <v-btn
        icon
        flat
        v-if="showFlagged"
        v-tooltip:right="{ html: 'Show all users'}"
        @click.native.stop="toggleFlagged"
      >
        <v-icon>format_list_bulleted</v-icon>
      </v-btn>

      <v-btn
        icon
        flat
        v-else
        v-tooltip:right="{ html: 'Show flagged users'}"
        @click.native.stop="toggleFlagged"
      >
        <v-icon>flag</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-text-field
        single-line
        hide-details
        label="Search"
        append-icon="search"
        v-model="search"
      ></v-text-field>

      <v-btn
        icon
        flat
        @click.native.stop="refresh"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-data-table
      v-bind:headers="headers"
      v-bind:items="users"
      v-bind:search="search"
    >
      <template slot="items" scope="props">
        <td @click.stop="viewUser(props.item)">
          {{ props.item.display_name }}
        </td>
        <td
          class="text-xs-right"
          @click.stop="viewUser(props.item)"
        >
          {{ props.item.account_role }}
        </td>
        <td
          class="text-xs-right"
          v-if="!showFlagged"
          @click.stop="viewUser(props.item)"
        >
          {{ props.item.is_locked ? 'Yes' : 'No' }}
        </td>

        <td
          class="text-xs-right"
          @click.stop="viewUser(props.item)"
        >
          {{ setTime(props.item.created_at) }}
        </td>
      </template>

      <template
        slot="pageText"
        scope="{ pageStart, pageStop }"
      >
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import setTime from '@/services/setTime'

export default {
  name: 'Users',
  data: () => ({
    isUserDialogOpen: false,
    isLoading: false,
    search: '',
    pagination: {},
    setTime: setTime,
  }),
  created () {
    this.$store.dispatch('GET_USERS')
    console.log(this.users)
  },
  mounted () {
    if (this.users.length < 1) {
      this.$store.commit('TOGGLE_SHOW_FLAGGED')
    }
  },
  computed: {
    title () {
      return `${this.showFlagged ? 'Flagged' : 'All'} Users`
    },

    headers () {
      const headers = [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
        },
        { text: 'Role', value: 'account_role' },
        { text: 'Created', value: 'created_at' },
      ]

      if (!this.showFlagged) {
        const lockedHeader = { text: 'Locked', value: 'is_locked' }
        headers.splice(2, 0, lockedHeader)
      }

      return headers
    },

    users () {
      return this.$store.getters.users
    },

    showFlagged () {
      return this.$store.state.showFlagged
    }
  },
  methods: {
    toggleFlagged () {
      this.$store.commit('TOGGLE_SHOW_FLAGGED')
      this.isLoading = true

      if (this.showFlagged) {
        this.$store.dispatch('GET_FLAGGED_USERS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      } else {
        this.$store.dispatch('GET_USERS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    },

    viewUser (user) {
      const formattedUser = user
      formattedUser.isFlagged = this.showFlagged

      this.$store.commit('SET_SELECTED_USER', formattedUser)
      this.$store.commit('OPEN_DIALOG', 'UserDialog')
    },

    refresh () {
      this.isLoading = true

      if (this.showFlagged) {
        this.$store.dispatch('GET_FLAGGED_USERS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      } else {
        this.$store.dispatch('GET_USERS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
td
  cursor: pointer
</style>
