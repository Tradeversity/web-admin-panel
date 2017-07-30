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
        v-model="formData.name"
        prependIcon="school"
      ></v-text-field>

      <location-search
        id="LocationSearch"
        prependIcon="my_location"
        placeholder="Search location..."
        v-model="formData.address"
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
        v-model="registration"
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
            hint="Shortend name for general purposes"
            v-model="formData.shortName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Asset name"
            v-model="formData.assetName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Domain name"
            v-model="formData.domainName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Sendy ID"
            v-model="formData.sendyID"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Radius"
            type="number"
            hint="Radius used with latitude and longitude"
            v-model="formData.radius"
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
            :style="{ 'backgroundColor': `rgb(${formData.colorRed}, ${formData.colorGreen}, ${formData.colorBlue})`}"
          ></div>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            label="Red"
            type="number"
            hint="3 max digits"
            :persistent-hint="$v.formData.colorRed.$invalid"
            :error="$v.formData.colorRed.$invalid"
            @keypress.native="prevent"
            v-model="formData.colorRed"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            label="Green"
            type="number"
            hint="3 max digits"
            :persistent-hint="$v.formData.colorGreen.$invalid"
            :error="$v.formData.colorGreen.$invalid"
            @keypress.native="prevent"
            v-model="formData.colorGreen"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            label="Blue"
            type="number"
            hint="3 max digits"
            :persistent-hint="$v.formData.colorBlue.$invalid"
            :error="$v.formData.colorBlue.$invalid"
            @keypress.native="prevent"
            v-model="formData.colorBlue"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click.native.stop="reset">
        Reset
      </v-btn>
      <v-btn flat primary @click.native.stop="submit">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { has } from 'lodash'
import { required, maxLength } from 'vuelidate/lib/validators'
import LocationSearch from '@/components/molecules/LocationSearch'

export default {
  name: 'CreateSchool',
  components: {
    LocationSearch,
  },
  data: () => ({
    hasStaticMap: false,
    staticMapURL: '',
  }),
  created () {

  },
  mounted () {

  },
  validations: () => ({
    formData: {
      colorRed: {
        required,
        maxLength: maxLength(3),
      },
      colorGreen: {
        required,
        maxLength: maxLength(3),
      },
      colorBlue: {
        required,
        maxLength: maxLength(3),
      }
    }
  }),
  computed: {
    formData: {
      get () {
        return this.$store.getters.schoolFormData
      },

      set (value) {
        value && this.$store.dispatch('SET_NEW_SCHOOL', value)
      }
    },

    registration: {
      get () {
        return this.$store.getters.schoolFormData.registration
      },

      set (value) {
        const data = this.formData
        data.registration = value
        this.$store.commit('SET_NEW_SCHOOL', data)
      }
    },

    title () {
      return 'Create school'
    },
  },
  methods: {
    reset () {
      this.$store.dispatch('SET_NEW_SCHOOL', {
        name: '',
        address: '',
        registration: true,
        categories: [],
        shortName: '',
        assetName: '',
        domainName: '',
        sendyID: '',
        radius: 5,
        colorRed: 0,
        colorGreen: 0,
        colorBlue: 0,
      })
    },

    prevent (event = window.event) {
      // event.preventDefault()
    },

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

    submit () {
      if (
        has(this.formData, 'name') &&
        has(this.formData, 'address') &&
        has(this.formData, 'registration') &&
        has(this.formData, 'selectedCategories') &&
        has(this.formData, 'shortName') &&
        has(this.formData, 'assetName') &&
        has(this.formData, 'domainName') &&
        has(this.formData, 'sendyID') &&
        has(this.formData, 'radius') &&
        has(this.formData, 'colorBlue') &&
        has(this.formData, 'colorGreen') &&
        has(this.formData, 'colorRed')
      ) {

      } else {
        console.log('Not all fields have been filled...')
      }
    }
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
