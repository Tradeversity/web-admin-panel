<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      Users

      <v-btn
        icon
        flat
        v-tooltip:right="{ html: 'Show flagged items'}"
        v-if="!showFlagged"
        @click.native.stop="loadFlaggedUsers"
      >
        <v-icon>flag</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-tooltip:right="{ html: 'Show flagged items'}"
        v-if="showFlagged"
        @click.native.stop="loadUsers"
      >
        <v-icon>format_list_bulleted</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="users"
      v-bind:search="search"
    >
      <template slot="items" scope="props">
        <td>{{ props.item.display_name }}</td>
        <td class="text-xs-right">{{ props.item.account_role }}</td>
        <td class="text-xs-right">
          {{ new Date(props.item.created_at).toDateString() }}
        </td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import fab from 'vue-fab'

export default {
  name: 'Users',
  components: {
    fab
  },
  data () {
    return {
      isUserDialogOpen: false,
      isLoading: false,
      showFlagged: false,
      search: '',
      pagination: {},
      bgColor: '#52A9DB',
      position: 'bottom-right',
      fabActions: [
        {
          name: 'addUser',
          icon: 'account_circle'
        }
      ],
      headers: [
        {
          text: 'Name',
          value: 'name',
          left: true,
        },
        { text: 'Role', value: 'account_role' },
        { text: 'Created', value: 'created_at' },
      ],
    }
  },
  computed: {
    users () {
      return (this.showFlagged
      ? this.$store.state.flaggedUsers
      : this.$store.state.users) || []
    }
  },
  methods: {
    addUser (event) {
      console.log('Adding user...')
      this.isUserDialogOpen = !this.isUserDialogOpen
    },

    loadUsers () {
      this.showFlagged = false

      if (this.$store.state.users.length < 1) {
        this.isLoading = true
        this.$store.dispatch('GET_USERS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    },

    loadFlaggedUsers () {
      this.showFlagged = true

      if (this.$store.state.flaggedUsers.length < 1) {
        this.isLoading = true
        this.$store.dispatch('GET_FLAGGED_USERS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    }
  },
  mounted () {
    if (this.$store.state.users.length < 1) {
      this.$store.dispatch('GET_USERS')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
