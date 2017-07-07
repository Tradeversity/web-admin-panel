<template>
  <v-layout column align-center>
    <v-flex xs12 class="mb-3">
      <router-link to="/logout">Go back to login...</router-link>
    </v-flex>
    <v-flex
      xs12
      class="mb-4 card-wrap"
      v-for="school in schools"
      :key="school.id"
    >
      <v-card>
        <v-card-row :style="{ backgroundColor: school.formattedColor }">
          <v-card-title class="white--text">
            {{ school.name.toUpperCase() }}
          </v-card-title>
        </v-card-row>
        <v-card-row v-if="school.admins.length < 1">
          <v-card-text>
            There are no admins available
          </v-card-text>
        </v-card-row>
        <v-card-row v-else class="list-row">
          <v-list two-line class="list">
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
        </v-card-row>
        <v-card-row actions>
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
        </v-card-row>
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
      this.$store.commit('OPEN_ADD_ADMIN_DIALOG')
    },

    openEditAdminDialog (admin) {
      this.$store.commit('SET_NEW_ADMIN', admin)
      this.$store.commit('OPEN_ADD_ADMIN_DIALOG')
    },

    openSchoolDialog (school) {
      this.$store.commit('SET_SCHOOL', school)
      this.$store.commit('OPEN_ADD_SCHOOL_DIALOG')
    },

    gotoAdmin (school) {
      this.$cookie.set('TV_ADMIN_SCHOOLID', school.id)
      this.$store.commit('SET_SCHOOL', school)
      this.$router.push({
        path: `school/${school.short_name}/dashboard`
      })
    }
  },

  created () {
    if (_.isEmpty(this.$store.state.schools)) {
      // this.$router.push('/login')
    }
  },

  mounted () {
    if (_.isEmpty(this.$store.state.schools)) {
      this.$store.dispatch('GET_ALL_SCHOOLS')
    }
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
