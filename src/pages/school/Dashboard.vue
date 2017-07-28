<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="headline">
            Active users
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="ActiveUserChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Gross Merch By Category
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="GrossMerchCatChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Student Interaction
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="StudentInteractionChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Total Market Value
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="TotalValueChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs7 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Active sellers
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="ActiveSellersChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs5 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Active Category Chart
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="ActiveCatChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs5 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Student Interaction By Category
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="StudentInteractionCatChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs7 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Market Engagement
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="MarketEngagmentChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 class="mt-3">
      <v-card>
        <v-card-title>
          <span class="headline">
            Daily Events
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <div id="DailyEventsChart"></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import config from '@/config'
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
    initKeen (readKey) {
      const client = new Keen({
        projectId: config.keenProjectID,
        readKey: readKey
      })

      Keen.ready(() => {
        /* Total accounts, active users */
        const activeUserCount = new Keen.Query('count', {
          event_collection: 'new_user_session',
          interval: 'daily',
          timeframe: 'this_1_months',
        })

        const activeUserChart = new Keen.Dataviz()
          .el('#ActiveUserChart')
          .type('line')
          .prepare()

        /* Number of active events, day to day */
        const dailyEventsCount = new Keen.Query('count', {
          event_collection: 'show_events',
          interval: 'daily',
          timeframe: 'this_1_months',
        })

        const dailyEventsChart = new Keen.Dataviz()
          .el('#DailyEventsChart')
          .type('line')
          .prepare()

        /* Total current GMV, split by category */
        const grossMerchCategory = new Keen.Query('sum', {
          event_collection: 'full_listing_view',
          target_property: 'price',
          timeframe: 'this_1_months',
          group_by: 'category',
        })

        const grossMerchCatChart = new Keen.Dataviz()
          .el('#GrossMerchCatChart')
          .type('pie')
          .prepare()

        /* Total current GMV, day to day */
        const totalMarketValue = new Keen.Query('sum', {
          event_collection: 'full_listing_view',
          target_property: 'price',
          timeframe: 'this_1_months',
          interval: 'daily',
        })

        const totalValueChart = new Keen.Dataviz()
          .el('#TotalValueChart')
          .type('line')
          .prepare()

        /* Number of users selling an item in each category */
        const activeSellers = new Keen.Query('count_unique', {
          event_collection: 'full_listing_view',
          target_property: 'user_id',
          group_by: 'category',
          timeframe: 'this_1_months',
        })

        const activeSellersChart = new Keen.Dataviz()
          .el('#ActiveSellersChart')
          .type('pie')
          .prepare()

        /* Number of listings by category */
        const activeCategories = new Keen.Query('count', {
          event_collection: 'full_listing_view',
          group_by: 'category',
          timeframe: 'this_1_months',
        })

        const activeCatChart = new Keen.Dataviz()
          .el('#ActiveCatChart')
          .type('pie')
          .prepare()

        /* Count of active threads per category */
        const studentInteractionCategory = new Keen.Query('count', {
          event_collection: 'question_asked',
          group_by: 'category',
          timeframe: 'this_1_months',
        })

        const studentInteractionCatChart = new Keen.Dataviz()
          .el('#StudentInteractionCatChart')
          .type('pie')
          .prepare()

        /* Number of active threads, day to day */
        const studentInteraction = new Keen.Query('count', {
          event_collection: 'question_asked',
          group_by: 'category',
          timeframe: 'this_1_months',
        })

        const studentInteractionChart = new Keen.Dataviz()
          .el('#StudentInteractionChart')
          .type('bar')
          .prepare()

        /* Number of listing views, day to day */
        const marketEngagment = new Keen.Query('count_unique', {
          event_collection: 'full_listing_view',
          target_property: 'id',
          interval: 'daily',
          timeframe: 'this_1_months',
        })

        const marketEngagmentChart = new Keen.Dataviz()
          .el('#MarketEngagmentChart')
          .type('line')
          .prepare()

        client.run([
          activeUserCount,
          dailyEventsCount,
          grossMerchCategory,
          totalMarketValue,
          activeSellers,
          activeCategories,
          studentInteractionCategory,
          studentInteraction,
          marketEngagment,
        ], (error, response) => {
          if (error) {
            console.log('Client run keen profile count error:', error)
          } else if (response !== null) {
            activeUserChart
              .data(response[0])
              .render()

            dailyEventsChart
              .data(response[1])
              .render()

            grossMerchCatChart
              .data(response[2])
              .render()

            totalValueChart
              .data(response[3])
              .render()

            activeSellersChart
              .data(response[4])
              .render()

            activeCatChart
              .data(response[5])
              .render()

            studentInteractionCatChart
              .data(response[6])
              .render()

            studentInteractionChart
              .data(response[7])
              .render()

            marketEngagmentChart
              .data(response[8])
              .render()
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
