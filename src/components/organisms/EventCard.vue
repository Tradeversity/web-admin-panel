<template>
  <v-card>
    <v-card-media
      :src="staticMapURL"
      height="200"
      alt="Google Map Event Representation"
    ></v-card-media>

    <v-card-title primary-title>
      <div>
        <div class="headline">
          {{ item.title }}
        </div>
        <span class="grey--text">
          {{ formatted.startTime }} - {{ formatted.endTime }}
        </span>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn icon @click.native="isExpanded = !isExpanded">
        <v-icon>{{ isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        flat
        icon
        v-tooltip:top="{ html: 'Edit event' }"
        @click.native.stop="editItem"
      >
        <v-icon>edit</v-icon>
      </v-btn>

      <v-dialog v-model="deleteDialog" lazy absolute>
        <v-btn
          flat
          icon
          v-tooltip:top="{ html: 'Delete event' }"
          @click.native.stop="deleteDialog = !deleteDialog"
          slot="activator"
        >
          <v-icon>delete</v-icon>
        </v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">Delete</span>
            <v-spacer></v-spacer>
            <v-btn icon flat @click.native="deleteDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            Are you sure you would like to delete <b>{{ item.title }}</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              @click.native="deleteDialog = false"
            >Cancel</v-btn>
            <v-btn
              flat
              primary
              @click.native.stop="deleteItem"
            >Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    <v-list v-show="isExpanded">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Description
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.description }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Start time
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ formatted.startTime }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            End time
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ formatted.endTime }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Location
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.location }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="item.event_url"
        :href="item.event_url"
        target="_blank"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            URL
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ item.event_url }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import setTime from '@/services/setTime'

export default {
  name: 'EventCard',
  props: ['item'],
  data: () => ({
    isExpanded: false,
    deleteDialog: false,
  }),
  computed: {
    formatted () {
      return {
        startTime: setTime(this.item.start_time),
        endTime: setTime(this.item.end_time),
      }
    },

    shortName () {
      return this.$store.state.school.short_name
    },

    schoolColor () {
      return this.$store.getters.schoolColor
    },

    staticMapURL () {
      return `https://maps.googleapis.com/maps/api/staticmap?scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:red%7Clabel:C%7C${this.item.latitude},${this.item.longitude}&key=AIzaSyBpnXldNOLRyuT4SP_3gDvmpUaNpPrO9eM`
    }
  },
  methods: {
    editItem () {
      this.$store.commit('SET_NEW_EVENT', this.item)
      this.$router.push({ path: `/school/${this.shortName}/event-manager/edit` })
    },

    deleteItem () {
      this.$store.dispatch('DELETE_EVENT', this.item.id)
      this.deleteDialog = false
    },
  }
}
</script>

<style lang="stylus" scoped>

</style>
