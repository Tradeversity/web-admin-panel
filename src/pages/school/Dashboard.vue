<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="headline">
            Active users
          </span>

          <v-spacer></v-spacer>

          <v-btn icon class="secondary--text" @click.native.stop="isRefreshing = !isRefreshing">
            <transition name="rotate">
              <v-icon :class="{'is-rotating': isRefreshing}">
                cached
              </v-icon>
            </transition>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-4">
           <div id="ActiveUserChart"></div>
          <!-- <market-users-chart :data="marketUsersData"></market-users-chart> -->
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12>
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
      </v-flex> -->
  </v-layout>
</template>

<script>
/* eslint-disable semi */

import Keen from 'keen-js'

import 'keen-analysis'
import 'keen-dataviz/dist/keen-dataviz.js'
import 'keen-dataviz/dist/keen-dataviz.css'

import config from '@/config'
import MarketUsersChart from '@/components/charts/MarketUsers'
// import ActiveUsersChart from '@/components/charts/ActiveUsers'
// import ReportsChart from '@/components/charts/Reports'
// import PageviewsChart from '@/components/charts/Pageviews'
// import ListingsChart from '@/components/charts/Listings'

export default {
  name: 'Dashboard',
  components: {
    MarketUsersChart,
    // ActiveUsersChart,
    // ReportsChart,
    // PageviewsChart,
    // ListingsChart,
  },
  data: () => ({
    isRefreshing: false,
    marketUsersData: [],
  }),
  created () {
    console.log(config.keenProjectID)
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
        projectId: config.keenProjectID,
        readKey: readKey
      });

      // Keen.ready(() => {
      //   const activeUserCount = new Keen.Query('count', {
      //     event_collection: 'new_user_session',
      //     interval: 'daily',
      //     timeframe: 'this_1_months'
      //   })

      //   const activeUserChart = new Keen.Dataviz()
      //     .el('#ActiveUserChart')
      //     // .el(document.getElementById('ActiveUserChart'))
      //     .height(280)
      //     .title('Signups this week')
      //     .type('line')
      //     .prepare()

      //   client.run(activeUserCount, (error, response) => {
      //     if (error) {
      //       console.log(error)
      //     } else if (response) {
      //       activeUserChart
      //         .data(response)
      //         .render()
      //     }
      //   })
      // })

      // const activeUserChart = new Keen.Dataviz()
      //   .el('#ActiveUserChart')
      //   // .library('chartjs')
      //   .type('line')
      //   .prepare()

      // client
      //   .query('count', {
      //     event_collection: 'new_user_session',
      //     interval: 'daily',
      //     timeframe: 'this_1_months',
      //   })
      //   .then(response => {
      //     activeUserChart
      //       .data(response)
      //       .render()
      //   })
      //   .catch(error => {
      //     activeUserChart.message(error.message)
      //   })

      Keen.ready(() => {
        /* Total accounts, active users */
        const activeUserCount = new Keen.Query('count', {
          event_collection: 'new_user_session',
          interval: 'daily',
          timeframe: 'this_1_months'
        });

          function (error, response) {
          if (error) {
            activeUserChart.error(error.message)
          } else if (response !== null) {
            console.log(response)
            activeUserChart
              .data(response)
              .render()
          }
        })
      })

      Keen.ready(() => {
        /* Total accounts, active users */
        const activeUserCount = new Keen.Query('count', {
          event_collection: 'new_user_session',
          interval: 'daily',
          timeframe: 'this_1_months',
        })

        client.draw(activeUserCount, document.getElementById('ActiveUserChart'), {
          library: 'chartjs',
          chartType: 'line',
        });

        // via Keen.Dataviz()
        const ActiveUserChart = new Keen.Dataviz()
          .el(document.getElementById('ActiveUserChart'))
          .library('chartjs')
          .chartType('line')
          .prepare();

        /* Number of active events, day to day */
        const dailyEventCount = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Total current GMV, split by category */
        const grossMerchCategory = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Total current GMV, day to day */
        const totalMarketValue = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Number of users selling an item in each category */
        const activeSellers = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Number of listings by category */
        const activeCategories = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Count of active threads per category */
        const studentInteractionCategory = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Number of active threads, day to day */
        const studentInteraction = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        /* Number of listing views, day to day */
        const marketEngagment = new Keen.Query('count', {
          event_collection: 'get_personal_profile',
          group_by: 'user_details.id',
          timeframe: 'this_1_years',
        })

        client.run([
          activeUserCount,
          dailyEventCount,
          grossMerchCategory,
          totalMarketValue,
          activeSellers,
          activeCategories,
          studentInteractionCategory,
          studentInteraction,
          marketEngagment,
        ], function (error, response) {
          if (error) {
            console.log('Client run keen profile count error:', error)
            ActiveUserChart.error(error.message)
          } else if (response !== null && response !== undefined) {
            console.log('Client run keen profile response:', response)
            // this.marketUsersData = response[0].result
            // const activeUserChartData = response[0]
            ActiveUserChart
              .parseRequest(this)
              .labels(['step 1'])
              .title('Marketplace active users')
              .render();
          }
        });
      });
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
