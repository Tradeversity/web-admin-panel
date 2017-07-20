<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-title>
        <span class="title">{{ item.title }}</span>
      </v-card-title>
      <v-card-media
        :src="staticMapURL"
        height="200"
        alt="Google Map Event Representation"
      ></v-card-media>
      <v-alert success v-model="item.is_approved" class="mt-0">
        This event has been approved.
      </v-alert>
      <v-alert warning v-model="hasWarningAlert" class="mt-0">
        This event needs to be managed.
      </v-alert>
      <v-list>
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
      </v-list>
      <v-card-actions>
        <v-btn
          flat
          primary
          @click.native.stop="approve"
          v-tooltip:top="{ html: 'Approve event'}"
        >
          <v-icon>check_circle</v-icon>
        </v-btn>
        <v-btn
          flat
          primary
          @click.native.stop="deny"
          v-tooltip:top="{ html: 'Deny event'}"
        >
          <v-icon>cancel</v-icon>
        </v-btn>
        <v-btn
          flat
          primary
          @click.native.stop="deleteEvent"
          v-tooltip:top="{ html: 'Delete event'}"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import setTime from '@/services/setTime'

export default {
  name: 'EventDialog',
  computed: {
    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },

    hasWarningAlert () {
      return !this.item.is_approved
    },

    item () {
      return this.$store.state.selectedEvent
    },

    formatted () {
      return {
        startTime: setTime(this.item.start_time),
        endTime: setTime(this.item.end_time),
      }
    },

    staticMapURL () {
      return `https://maps.googleapis.com/maps/api/staticmap?scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:red%7Clabel:C%7C${this.item.latitude},${this.item.longitude}&key=AIzaSyBpnXldNOLRyuT4SP_3gDvmpUaNpPrO9eM`
    }
  },
  methods: {
    approve () {
      this.$store.dispatch('POST_APPROVE_EVENT', this.item.id)
        .then(() => {
          this.$store.commit('TOGGLE_TABLE_LOADING')
          this.$store.commit('CLOSE_EVENT_DIALOG')
          this.$store.dispatch('GET_EVENTS')
            .then(() => {
              this.$store.commit('TOGGLE_TABLE_LOADING')
            })
        })
    },

    deny () {
      if (this.item.is_approved) {
        this.$store.dispatch('POST_DENY_EVENT', this.item.id)
          .then(() => {
            this.$store.commit('TOGGLE_TABLE_LOADING')
            this.$store.commit('CLOSE_EVENT_DIALOG')
            this.$store.dispatch('GET_EVENTS')
              .then(() => {
                this.$store.commit('TOGGLE_TABLE_LOADING')
              })
          })
      } else {
        this.deleteEvent()
      }
    },

    deleteEvent () {
      this.$store.dispatch('DELETE_EVENT', this.item.id)
        .then(() => {
          this.$store.commit('TOGGLE_TABLE_LOADING')
          this.$store.commit('CLOSE_EVENT_DIALOG')
          this.$store.dispatch('GET_EVENTS')
            .then(() => {
              this.$store.commit('TOGGLE_TABLE_LOADING')
            })
        })
    },
  }
}
</script>

<style lang="stylus">
// .dialog
//  overflow: visible
</style>

