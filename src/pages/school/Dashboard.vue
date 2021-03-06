<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="headline">
            Marketplace Users
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="MarketplaceUsersChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Monthly Active Users
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="MonthlyActiveUsersChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            User Sessions
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="UserSessionsChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            New Listings Created by Category
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="ListingByCategoryChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Listing Views
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="ListingViewsChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            User Interactions
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="UserInteractionsChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Questions Asked by Category
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="StudentInteractionByCategoryChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Total Marketplace Value
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="TotalMarketplaceValueChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Sellers by Category
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="SellersByCategoryChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Gross Listing Value by Category
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="GrossListingValueByCategory"></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import config from '@/config'
import d3 from 'd3'
import Keen from 'keen-js'

import 'keen-analysis'
import 'keen-dataviz/dist/keen-dataviz.js'
import 'keen-dataviz/dist/keen-dataviz.css'

export default {
  name: 'Dashboard',
  data: () => ({
    isRefreshing: false,
  }),
  created () {
    this.$store.dispatch('GET_KEEN')
      .then(response => {
        this.initKeen(response.data.keen_access_key)
      })
  },
  methods: {
    getToday () {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }
      return yyyy + '-' + mm + '-' + dd
    },
    startOfSemester () {
      return '2017-08-01'
    },
    initKeen: function (readKey) {
      const client = new Keen({
        projectId: config.keenProjectID,
        readKey: readKey,
      })

      Keen.ready(() => {
        /* Total accounts, active users */

        const defaultTimeFrame = {
          start: this.startOfSemester(),
          end: this.getToday()
        }

        const marketplaceUserAccounts = new Keen.Query('count', {
          event_collection: 'new_user_created',
          target_property: 'total_users',
          interval: 'daily',
          timeframe: defaultTimeFrame,
        })

        const marketplaceUsersChart = new Keen.Dataviz()
          .el('#MarketplaceUsersChart')
          .type('area-spline')
          .chartOptions({
            point: {
              show: false
            }
          })
          .prepare()

        /* Number of Active Users by month */
        const monthlyActiveUsers = new Keen.Query('count_unique', {
          event_collection: 'new_user_session',
          target_property: 'user_id',
          interval: 'monthly',
          timeframe: defaultTimeFrame,
        })

        const monthlyActiveUsersChart = new Keen.Dataviz()
          .el('#MonthlyActiveUsersChart')
          .type('bar')
          .prepare()

        const marketplaceUserSessions = new Keen.Query('count', {
          event_collection: 'new_user_session',
          interval: 'monthly',
          timeframe: defaultTimeFrame,
        })

        const userSessionsChart = new Keen.Dataviz()
          .el('#UserSessionsChart')
          .type('bar')
          .colors(['green'])
          .prepare()

        /* Number of listings by category */
        const listingByCategory = new Keen.Query('count', {
          event_collection: 'create_listing',
          interval: 'weekly',
          group_by: 'category',
          timeframe: 'this_6_weeks',
        })

        const listingByCategoryChart = new Keen.Dataviz()
          .el('#ListingByCategoryChart')
          .type('area-spline')
          .stacked(true)
          .chartOptions({
            point: {
              show: false
            }
          })
          .prepare()

        /* Number of listing views, day to day */
        const listingViews = new Keen.Query('count', {
          event_collection: 'full_listing_view',
          interval: 'weekly',
          group_by: 'category',
          timeframe: defaultTimeFrame
        })

        const listingViewsChart = new Keen.Dataviz()
          .el('#ListingViewsChart')
          .type('area-spline')
          .stacked(true)
          .chartOptions({
            point: {
              show: false
            }
          })
          .prepare()

        /* Number of active threads, day to day */
        const userInteractions = new Keen.Query('count', {
          event_collection: 'send_message',
          interval: 'weekly',
          timeframe: defaultTimeFrame
        })

        const userInteractionsChart = new Keen.Dataviz()
          .el('#UserInteractionsChart')
          .type('area-spline')
          .chartOptions({
            point: {
              show: false
            }
          })
          .prepare()

        /* Count of active threads per category */
        const questionsAskedByCategory = new Keen.Query('count', {
          event_collection: 'question_asked',
          group_by: 'category',
          interval: 'weekly',
          timeframe: defaultTimeFrame
        })

        const questionsAskedByCategoryChart = new Keen.Dataviz()
          .el('#StudentInteractionByCategoryChart')
          .type('area-spline')
          .stacked(true)
          .chartOptions({
            point: {
              show: false
            },
            legend: {
              show: true,
              position: 'bottom'
            }
          })
          .prepare()

        /* Number of users selling an item in each category */

        const sellersByCategoryChart = new Keen.Dataviz()
          .el('#SellersByCategoryChart')
          .type('pie')
          .prepare()

        const totalMarketplaceValueChart = new Keen.Dataviz()
          .el('#TotalMarketplaceValueChart')
          .type('area-spline')
          .stacked(true)
          .chartOptions({
            point: {
              show: false
            },
            axis: {
              y: {
                tick: {
                  format: d3.format('$,')
                }
              }
            }
          })
          .prepare()

        const grossListingValueByCategoryChart = new Keen.Dataviz()
          .el('#GrossListingValueByCategory')
          .type('pie')
          .prepare()

        client.run([
          marketplaceUserAccounts,
          monthlyActiveUsers,
          marketplaceUserSessions,
          listingByCategory,
          listingViews,
          userInteractions,
          questionsAskedByCategory,
        ], (error, response) => {
          if (error) {
            console.log('Client run keen profile count error:', error)
          } else if (response !== null) {
            console.log('Keen response', response)

            this.$store.dispatch('GET_KEEN_MARKETPLACE_USERS')
              .then(res => {
                marketplaceUsersChart
                  .data(res.data)
                  .render()
              })

            this.$store.dispatch('GET_SELLERS_BY_CATEGORY')
              .then(res => {
                sellersByCategoryChart
                  .data(res.data)
                  .render()
              })

            this.$store.dispatch('GET_VALUE_BY_CATEGORY')
              .then(res => {
                grossListingValueByCategoryChart
                  .data(res.data)
                  .call(function () {
                    for (let i = 1; i < this.dataset.matrix.length; i++) {
                      this.dataset.updateColumn(i, function (value, index, column) {
                        return value / 100
                      })
                    }
                  })
                  .render()
              })

            monthlyActiveUsersChart
              .data(response[1])
              .render()

            userSessionsChart
              .data(response[2])
              .render()

            listingByCategoryChart
              .data(response[3])
              .render()

            listingViewsChart
              .data(response[4])
              .render()

            userInteractionsChart
              .data(response[5])
              .render()

            questionsAskedByCategoryChart
              .data(response[6])
              .render()

            this.$store.dispatch('GET_KEEN_TOTAL_MARKET_VALUE', this.startOfSemester())
              .then(res => {
                totalMarketplaceValueChart
                  .chartOptions({
                    axis: {
                      x: {
                        localtime: false,
                        type: 'timeseries',
                        tick: {
                          format: '%b %e'
                        }
                      }
                    }
                  })
                  .data(res.data)
                  .call(function () {
                    for (let i = 1; i < this.dataset.matrix.length; i++) {
                      this.dataset.updateColumn(i, function (value, index, column) {
                        return value / 100
                      })
                    }
                  })
                  .render()
              })
          }
        })
      })
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
