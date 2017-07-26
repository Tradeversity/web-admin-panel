<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="headline">
            Active users
          </span>

          <v-spacer></v-spacer>

          <v-btn
            icon
            class="secondary--text"
            @click.native.stop="isRefreshing = !isRefreshing"
          >
            <transition name="rotate">
              <v-icon :class="{'is-rotating': isRefreshing}">
                cached
              </v-icon>
            </transition>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-4">
          <active-users-chart />
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md5>
      <v-card class="mt-4">
        <v-card-title>
          <span class="headline">
            Sales by categories
          </span>

          <v-spacer></v-spacer>

          <v-btn
            icon
            class="secondary--text"
            @click.native.stop="isRefreshing = !isRefreshing"
          >
            <transition name="rotate">
              <v-icon :class="{'is-rotating': isRefreshing}">
                cached
              </v-icon>
            </transition>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-4">
          <pageviews-chart />
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md7>
      <v-card class="mt-4">
        <v-card-title>
          <span class="headline">
            Listings
          </span>

          <v-spacer></v-spacer>

          <v-btn
            icon
            class="secondary--text"
            @click.native.stop="isRefreshing = !isRefreshing"
          >
            <transition name="rotate">
              <v-icon :class="{'is-rotating': isRefreshing}">
                cached
              </v-icon>
            </transition>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-4">
          <reports-chart />
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="mt-4">
        <v-card-title>
          <span class="headline">
            Listings (past month)
          </span>

          <v-spacer></v-spacer>

          <v-btn
            icon
            class="secondary--text"
            @click.native.stop="isRefreshing = !isRefreshing"
          >
            <transition name="rotate">
              <v-icon :class="{'is-rotating': isRefreshing}">
                cached
              </v-icon>
            </transition>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-4">
          <listings-chart />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Keen from 'keen-js'
import ActiveUsersChart from '@/components/charts/ActiveUsers'
import ReportsChart from '@/components/charts/Reports'
import PageviewsChart from '@/components/charts/Pageviews'
import ListingsChart from '@/components/charts/Listings'

export default {
  name: 'Dashboard',
  components: {
    ActiveUsersChart,
    ReportsChart,
    PageviewsChart,
    ListingsChart,
  },
  data: () => ({
    isRefreshing: false,
  }),
  created () {
    this.$store.dispatch('GET_KEEN')
      .then(response => {
        this.initKeen(response.data.keen_access_key)
      })
  },
  computed: {
    // schoolID () {
    //   return this.$store.state.schoolID
    // }
  },
  methods: {
    initKeen (readKey) {
      const client = new Keen({
        readKey: readKey,
      })

      Keen.ready(() => {
        const savedQueries = client.savedQueries()

        savedQueries.all((error, response) => {
          if (error) {
            console.log('Keen savedQueries error:', error)
          } else {
            console.log('Keen savedQueries response:', response)
          }
        })
      })

      console.log('KEEN', client)
    }
  },
  watch: {
    isRefreshing: () => {
      setTimeout(() => {
        this.isRefreshing = false
        console.log(this.isRefreshing)
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes rotation
  from
    transform: rotate(360deg)
  to
    transform: rotate(0deg)

.is-rotating
  animation: rotation 1s infinite linear

.rotate-enter-active
  animation: rotation 1s infinite linear

.rotate-leave-active
  animation: rotation 1s infinite linear
</style>
