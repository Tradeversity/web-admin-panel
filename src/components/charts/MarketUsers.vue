<template>
  <line-chart
    class="chart"
    :data="lineChartData"
    :options="options"
  />
</template>

<script>
import LineChart from './base/Line'

export default {
  name: 'MarketUsersChart',
  components: { LineChart },
  props: ['userData'],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  }),
  mounted () {
    console.log('here', this.userData)
  },
  computed: {
    lineChartData () {
      return this.userData
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart
  position: relative
  overflow: hidden
  width: 100%
  height: 100%
</style>
