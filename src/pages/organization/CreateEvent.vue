<template>
  <add-event-card
    class="card"
  ></add-event-card>
</template>

<script>
import AddEventCard from '@/components/organisms/AddEventCard'

export default {
  name: 'CreateEvent',
  components: {
    AddEventCard,
  }
}
</script>

<style lang="stylus" scoped>
.card
  max-width: 500px
  margin: 0 auto
  margin-top: -80px
</style>

