/*
 *  Event.vue
 *  + Add, Edit, Delete events
 *
 *
*/

<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>

        <v-card-text class="text-xs-left">
          <v-text-field
            label="Title"
            max="80"
            counter
            :hint="formState.title.hint"
            :error="formState.title.error"
            :persistent-hint="formState.title.error"
            v-model="formData.title"
          ></v-text-field>

          <v-text-field
            label="Location"
            max="80"
            counter
            :hint="formState.location.hint"
            :error="formState.location.error"
            :persistent-hint="formState.location.error"
            v-model="formData.location"
          ></v-text-field>

          <v-text-field
            label="Description"
            max="150"
            counter
            multi-line
            :hint="formState.description.hint"
            :error="formState.description.error"
            :persistent-hint="formState.description.error"
            v-model="formData.description"
          ></v-text-field>

          <location-search
            id="LocationSearch"
            prependIcon="my_location"
            placeholder="Search location..."
            v-on:placechanged="getAddressData"
          ></location-search>

          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="datePicker1"
            transition="scale-transition"
            offset-y
            :nudge-left="40"
          >
            <v-text-field
              slot="activator"
              prepend-icon="date_range"
              label="Start date"
              readonly
              :hint="formState.startDate.hint"
              :error="formState.startDate.error"
              :persistent-hint="formState.startDate.error"
              v-model="formData.startDate"
            ></v-text-field>
            <v-date-picker
              v-model="formData.startDate"
              autosave
            ></v-date-picker>
          </v-menu>

          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="timePicker1"
            transition="scale-transition"
            offset-y
            :nudge-left="40"
          >
            <v-text-field
              slot="activator"
              prepend-icon="access_time"
              label="Start time"
              readonly
              :hint="formState.startTime.hint"
              :error="formState.startTime.error"
              :persistent-hint="formState.startTime.error"
              v-model="formData.startTime"
            ></v-text-field>
            <v-time-picker
              v-model="formData.startTime"
              autosave
            ></v-time-picker>
          </v-menu>

          <!-- <v-btn
            block
            primary
            v-if="!hasEndDate"
            @click.native.stop="hasEndDate = !hasEndDate"
          >
            Set end date
          </v-btn> -->

          <v-menu
            lazy
            offset-y
            transition="scale-transition"
            :nudge-left="40"
            :close-on-content-click="false"
            v-model="datePicker2"
          >
            <v-text-field
              slot="activator"
              prepend-icon="date_range"
              label="End date"
              readonly
              :hint="formState.endDate.hint"
              :error="formState.endDate.error"
              :persistent-hint="formState.endDate.error"
              v-model="formData.endDate"
            ></v-text-field>
            <v-date-picker
              v-model="formData.endDate"
              autosave
            ></v-date-picker>
          </v-menu>

          <v-menu
            lazy
            offset-y
            transition="scale-transition"
            :nudge-left="40"
            :close-on-content-click="false"
            v-model="timePicker2"
          >
            <v-text-field
              slot="activator"
              prepend-icon="access_time"
              label="End time"
              readonly
              :hint="formState.endTime.hint"
              :error="formState.endTime.error"
              :persistent-hint="formState.endTime.error"
              :formatted-value="val => new Date(val).toISOString().substr(0, 10)"
              v-model="formData.endTime"
            ></v-text-field>
            <v-time-picker
              v-model="formData.endTime"
              autosave
            ></v-time-picker>
          </v-menu>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            @click.native="reset"
          >Reset</v-btn>
          <v-btn
            type="submit"
            flat
            primary
            :loading="isLoading"
          >Submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
import LocationSearch from '@/components/molecules/LocationSearch'
// import validateEmail from '@/services/validateEmail'

export default {
  name: 'CreateEventDialog',
  components: {
    // VueGoogleAutocomplete
    LocationSearch,
  },
  data () {
    return {
      hasEndDate: false,
      timePicker1: false,
      timePicker2: false,
      datePicker1: false,
      datePicker2: false,
      confirm: '',
      isLoading: false,
      fieldNames: [
        'title',
        'description',
        'startDate',
        'endDate',
        'startTime',
        'endTime',
        'location',
        'lat',
        'long',
      ],
    }
  },
  computed: {
    isOpen: {
      get () {
        return this.$store.state.dialog[this.$options.name].active
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },

    schoolColor () {
      return this.$store.getters.schoolColor
    },

    formState () {
      let state = {}

      this.fieldNames.map(name => {
        state[name] = {
          hint: '',
          error: false,
        }
      })

      state.form = 'info'
      state.snackMessage = 'Add event'

      // console.log('state', state)

      return state
    },

    title () {
      return this.$store.state.newEvent.title ? 'Edit event' : 'Create event'
    },

    formData: {
      get () {
        return this.$store.state.newEvent
      },

      set (value) {
        this.$store.commit('SET_NEW_EVENT', this.formData)
        console.log(this.$store.state.newEvent, value)
      }
    },
  },
  methods: {
    getAddressData (addressData, placeResultData) {
      this.formData.locationData = {
        addressData: addressData,
        placeResultData: placeResultData,
      }

      this.$store.commit('SET_NEW_EVENT', this.formData)
      console.log('yes', this.$store.state.newEvent)
    },

    openSetLocation () {
      this.$store.commit('OPEN_SET_LOCATION_DIALOG')
    },

    reset () {
      this.$store.commit('SET_NEW_EVENT', {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        lat: '',
        long: '',
      })

      this.confirm = ''
    },

    submit () {
      this.$store.dispatch('POST_EVENT')
    }
  },
}
</script>

<style lang="stylus" scoped>
.search
  border-bottom: 1px solid grey
</style>
