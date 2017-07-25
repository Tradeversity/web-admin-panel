<template>
  <v-card class="card card--flex-toolbar">
    <v-toolbar card class="white" prominent>
      <v-toolbar-title class="headline">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <form @submit.prevent="submit">
      <v-card-text class="text-xs-left">
        <v-card-media
          v-show="hasStaticMap"
          class="mb-5"
          :src="staticMapURL"
          height="200"
        ></v-card-media>

        <v-text-field
          label="Title"
          max="80"
          counter
          :hint="formState.title.hint"
          :error="formState.title.error"
          :persistent-hint="formState.title.error"
          v-model="formData.title"
        ></v-text-field>

        <location-search
          id="LocationSearch"
          prependIcon="my_location"
          placeholder="Search location..."
          @placechanged="getAddressData"
        ></location-search>

        <v-text-field
          label="Location name"
          max="80"
          counter
          :hint="formState.location.hint"
          :error="formState.location.error"
          :persistent-hint="formState.location.error"
          v-model="formData.location"
        ></v-text-field>

        <v-text-field
          label="Event link"
          placeholder="http://"
          :hint="formState.link.hint"
          :error="formState.link.error"
          :persistent-hint="formState.link.error"
          v-model="formData.link"
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

        <v-layout row wrap>
          <v-flex xs6>
            <v-dialog
              v-model="datePicker1"
              lazy
            >
              <v-text-field
                slot="activator"
                label="Start date"
                prepend-icon="date_range"
                :hint="formState.startDate.hint"
                :error="formState.startDate.error"
                :persistent-hint="formState.startDate.error"
                v-model="startFormattedDate"
                readonly
              ></v-text-field>

              <v-date-picker
                v-model="startDate"
                scrollable
                :date-format="date => new Date(date).toDateString()"
                :formatted-value.sync="startFormattedDate"
                :allowed-dates="allowedStartDate"
              >
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      secondary
                      @click.native="datePicker1 = false; startDate = ''"
                    >Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs6>
            <v-dialog
              v-model="timePicker1"
              lazy
              full-width
            >
              <v-text-field
                slot="activator"
                label="Start time"
                prepend-icon="access_time"
                :hint="formState.startTime.hint"
                :error="formState.startTime.error"
                :persistent-hint="formState.startTime.error"
                v-model="startTime"
                readonly
              ></v-text-field>

              <v-time-picker v-model="startTime" scrollable>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      secondary
                      @click.native="timePicker1 = false; startTime = ''"
                    >Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-time-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs6>
            <v-dialog
              v-model="datePicker2"
              lazy
              full-width
            >
              <v-text-field
                slot="activator"
                label="End date"
                prepend-icon="date_range"
                :hint="formState.endDate.hint"
                :error="formState.endDate.error"
                :persistent-hint="formState.endDate.error"
                v-model="endFormattedDate"
                readonly
              ></v-text-field>

              <v-date-picker
                v-model="endDate"
                scrollable
                :date-format="date => new Date(date).toDateString()"
                :formatted-value.sync="endFormattedDate"
                :allowed-dates="allowedEndDate"
              >
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      secondary
                      @click.native="datePicker2 = false; endDate = ''"
                    >Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs6>
            <v-dialog
              v-model="timePicker2"
              lazy
              full-width
            >
              <v-text-field
                slot="activator"
                label="End time"
                prepend-icon="access_time"
                :hint="formState.endTime.hint"
                :error="formState.endTime.error"
                :persistent-hint="formState.endTime.error"
                v-model="endTime"
                readonly
              ></v-text-field>

              <v-time-picker v-model="endTime" scrollable>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      secondary
                      @click.native="timePicker2 = false; endTime = ''"
                    >Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-time-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
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
</template>

<script>
import { has } from 'lodash'
import moment from 'moment'
import LocationSearch from '@/components/molecules/LocationSearch'

// const hasFields = (data, fields) => fields.filter(field => has(data, field)) === fields

export default {
  name: 'AddEventCard',
  components: {
    LocationSearch,
  },
  data: () => ({
    allowedStartDate: null,
    allowedEndDate: null,
    allowedStartTime: null,
    allowedEndTime: null,
    staticMapURL: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    startFormattedDate: '',
    endFormattedDate: '',
    hasStaticMap: false,
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
      'link',
      'lat',
      'long',
    ],
  }),
  created () {
    if (this.$route.fullPath.indexOf('create') !== -1) {
      this.$store.commit('SET_NEW_EVENT', {})
    }
  },
  mounted () {
    const today = new Date().toISOString().split('T')[0]

    this.allowedStartDate = (date) => {
      const formattedDate = date.toISOString().split('T')[0]

      if (today <= formattedDate) {
        return date
      }
    }

    this.allowedEndDate = (date) => {
      const formattedDate = date.toISOString().split('T')[0]

      if (today <= formattedDate) {
        if (this.startDate !== '' && this.startDate <= formattedDate) {
          return date
        } else if (this.startDate === '') {
          return date
        }
      }
    }

    this.allowedStartTime = (time) => {
      console.log(time)
      if (this.endTime === '') {
        return time
      } else if (time < this.endTime) {
        return time
      }
    }

    this.allowedEndTime = (time) => {
      if (this.startTime === '') {
        return time
      } else if (time < this.startTime) {
        return time
      }
    }
  },
  computed: {
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

      return state
    },

    title () {
      return has(this.$store.state.newEvent, 'id') ? 'Edit event' : 'Create event'
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

      if (
        !has(this.formData, 'location') ||
        this.formData.location === undefined ||
        this.formData.location === null ||
        this.formData.location.length < 2
      ) {
        this.formData.location = addressData.locality
      }

      this.$store.commit('SET_NEW_EVENT', this.formData)
      this.setEventStaticMap(this.formData.locationData)
    },

    setEventStaticMap (data) {
      this.hasStaticMap = true
      console.log(data)
      this.staticMapURL = `https://maps.googleapis.com/maps/api/staticmap?scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:red%7Clabel:C%7C${data.addressData.latitude},${data.addressData.longitude}&key=AIzaSyBpnXldNOLRyuT4SP_3gDvmpUaNpPrO9eM`
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
      if (this.startDate.length < 2) {
        this.formState.startDate.hint = 'Please enter a valid date'
        this.formState.startDate.error = true
        return
      }

      if (this.startTime.length < 2) {
        this.formState.startTime.hint = 'Please enter a valid time'
        this.formState.startTime.error = true
        return
      }

      if (this.endDate.length < 2) {
        this.formState.endDate.hint = 'Please enter a valid date'
        this.formState.endDate.error = true
        return
      }

      if (this.endTime.length < 2) {
        this.formState.endTime.hint = 'Please enter a valid time'
        this.formState.endTime.error = true
        return
      }

      const offset = new Date().getTimezoneOffset()
      const format = 'YYYY-MM-DD HH:mmA'
      const startTime = moment(`${this.startDate} ${this.startTime}`, format).utcOffset(offset).unix()
      const endTime = moment(`${this.endDate} ${this.endTime}`, format).utcOffset(offset).unix()

      this.formData.start_time = startTime
      this.formData.end_time = endTime
      this.$store.commit('SET_NEW_EVENT', this.formData)
      this.$store.dispatch('POST_EVENT')
        .then(response => {
          if (response.status === 200) {
            this.$router.push({
              path: `/school/${this.$store.state.school.short_name}/event-manager/`
            })
          }
        })

      // const hasAllFields = hasFields(this.formData, [
      //   'title',
      //   'description',
      //   'startTime',
      //   'endTime',
      //   'location',
      //   'long',
      //   'lat',
      // ])

      // if (hasAllFields) {
      //   this.$store.dispatch('POST_EVENT')
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

