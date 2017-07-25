<template>
  <v-layout column align-center>
    <v-flex
      xs12
      class="mb-4 card-wrap"
      v-for="school in schools"
      :key="school.id"
    >
      <v-card>
        <v-card-title class="white--text" :style="{ backgroundColor: school.formattedColor }">
          <span class="headline">{{ school.name.toUpperCase() }}</span>
        </v-card-title>

        <v-card-text v-if="school.admins.length < 1">
          There are no admins available
        </v-card-text>

        <v-list two-line v-else class="list">
          <template v-for="(admin, index) in school.admins">
            <v-divider v-if="index !== 0"></v-divider>
            <v-list-tile @click.native.stop="openEditAdminDialog(admin)">
              <v-list-tile-content>
                <v-list-tile-title
                  v-html="admin.display_name"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="`Updated: ${Date(admin.updated_at)}`"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            icon
            v-tooltip:top="{ html: 'Add admin' }"
            @click.native.stop="openAdminDialog(school)"
          >
            <v-icon>add_circle</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            v-tooltip:top="{ html: 'Edit school' }"
            @click.native.stop="openSchoolDialog(school)"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            v-tooltip:top="{ html: 'Go to school' }"
            @click.native.stop="gotoAdmin(school)"
          >
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Super',
  computed: {
    schools () {
      const schools = this.$store.state.schools.map((school) => {
        let formattedColor = false

        if ((
          school.color[0] === 255 &&
          school.color[1] === 255 &&
          school.color[2] === 255
        ) || (
          school.color[0] === 0 &&
          school.color[1] === 0 &&
          school.color[2] === 0
        )) {
          formattedColor = '#D6262E'
        } else {
          formattedColor = `rgb(${school.color[0]}, ${school.color[1]}, ${school.color[2]})`
        }

        school.formattedColor = formattedColor
        return school
      })

      return schools
    },
  },

  methods: {
    openAdminDialog (school) {
      this.$store.commit('SET_SCHOOL', school)
      this.$store.commit('SET_NEW_ADMIN', {})
      this.$store.commit('OPEN_DIALOG', 'AddAdminDialog')
    },

    openEditAdminDialog (admin) {
      this.$store.commit('SET_NEW_ADMIN', admin)
      this.$store.commit('OPEN_DIALOG', 'AddAdminDialog')
    },

    openSchoolDialog (school) {
      this.$store.commit('SET_SCHOOL', school)
      this.$store.commit('OPEN_DIALOG', 'AddSchoolDialog')
    },

    gotoAdmin (school) {
      this.$cookie.set('TV_ADMIN_SCHOOLID', school.id)
      this.$store.commit('SET_SCHOOL', school)
      this.$router.push({
        path: `/school/${school.short_name}/dashboard`
      })
    }
  },

  created () {
    if (_.isEmpty(this.$store.state.schools)) {
      // this.$router.push('/login')
    }
  },

  mounted () {
    this.$store.dispatch('GET_ALL_SCHOOLS')
  }
}
</script>

<style lang="stylus" scoped>
.card-wrap
  width: 500px

.list
  width: 100%
  max-height: 300px
  overflow-y: auto

</style>
