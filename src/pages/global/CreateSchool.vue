<template>
  <v-card>
    <v-card-title>
      <span class="headline">
        {{ title }}
      </span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text>
      <v-text-field
        label="School name"
        prependIcon="school"
      ></v-text-field>

      <location-search
        id="LocationSearch"
        prependIcon="my_location"
        placeholder="Search location..."
        @placechanged="getAddressData"
      ></location-search>

      <v-card-media
        v-show="hasStaticMap"
        class="mb-5"
        :src="staticMapURL"
        height="200"
      ></v-card-media>

      <span v-if="hasStaticMap" class="subheading">
        Lat: {{ formData.latitude }}
      </span>

      <br>

      <span v-if="hasStaticMap" class="subheading">
        Long: {{ formData.longitude }}
      </span>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text>
      <v-checkbox
        label="Registration allowed"
        type="checkbox"
      ></v-checkbox>

      <v-select
        label="Categories"
        :items="formData.availableCategories"
        v-model="formData.selectedCategories"
        hint="Select categories for this school"
        persistent-hint
        multiple
      ></v-select>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text>
      <v-layout column>
        <v-flex xs12 sm6>
          <v-text-field
            label="Short name"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Asset name"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Domain name"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Sendy ID"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Radius"
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 class="pt-3">
          <span class="subheading">
            RGB Color
          </span>

          <div
            class="color-block ml-2"
            :style="{ 'backgroundColor': `rgb(${color[0]}, ${color[1]}, ${color[2]})`}"
          ></div>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            label="Red"
            type="number"
            v-model="color[0]"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            label="Green"
            type="number"
            v-model="color[1]"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            label="Blue"
            type="number"
            v-model="color[2]"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat>
        Reset
      </v-btn>
      <v-btn flat primary>
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { has } from 'lodash'
import LocationSearch from '@/components/molecules/LocationSearch'

export default {
  name: 'CreateSchool',
  components: {
    LocationSearch,
  },
  data: () => ({
    hasStaticMap: false,
    staticMapURL: '',
    color: [0, 0, 0],
  }),
  created () {

  },
  mounted () {

  },
  computed: {
    formData: {
      get () {
        return this.$store.getters.schoolFormData
      },

      set (value) {
        value && this.$store.dispatch('SET_NEW_SCHOOL', value)
      }
    },

    title () {
      return 'Create school'
    },
  },
  methods: {
    getAddressData (addressData, placeResultData) {
      this.formData.locationData = {
        addressData: addressData,
        placeResultData: placeResultData,
      }

      this.formData.latitude = addressData.latitude
      this.formData.longitude = addressData.longitude

      if (
        !has(this.formData, 'location') ||
        this.formData.location === undefined ||
        this.formData.location === null ||
        this.formData.location.length < 2
      ) {
        this.formData.location = addressData.locality
      }

      this.$store.commit('SET_NEW_SCHOOL', this.formData)
      this.setEventStaticMap(this.formData.locationData)
    },

    setEventStaticMap (data) {
      this.hasStaticMap = true

      this.staticMapURL = `https://maps.googleapis.com/maps/api/staticmap?scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:red%7Clabel:C%7C${data.addressData.latitude},${data.addressData.longitude}&key=AIzaSyBpnXldNOLRyuT4SP_3gDvmpUaNpPrO9eM`
    },
  }
}
</script>

<style lang="stylus" scoped>
.color-block
  display: inline-block
  height: 15px
  width: 15px
  background-color: rgb(0, 0, 0)
  border: 2px solid rgba(0, 0, 0, 0.87)

.card
  max-width: 500px
  margin: 0 auto
  margin-top: -80px
  margin-bottom: 100px
</style>
