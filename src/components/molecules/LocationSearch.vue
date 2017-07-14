/*
 * LocationSearch.vue
 * + Google places api added to material field
 * => Translated from https://github.com/olefirenko/vue-google-autocomplete/blob/master/src/VueGoogleAutocomplete.vue
 *
*/

<template>
  <v-text-field
    ref="autocomplete"
    type="text"
    :id="id"
    :prepend-icon="prependIcon"
    :placeholder="placeholder"
    @focus="onFocus()"
    @blur="onBlur()"
    @change="onChange"
    @keypress="onKeyPress"
    v-model="autocompleteText"
  ></v-text-field>
</template>

<script>
export default {
  name: 'LocationSearch',
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Location',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    types: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    enableGeolocation: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    autocomplete: null,
    autocompleteText: '',
  }),
  methods: {
    onFocus () {
      this.geolocate()
      this.$emit('focus')
    },

    onBlur () {
      this.$emit('blur')
    },

    onChange () {
      this.$emit('change', this.autocompleteText)
    },

    onKeyPress (event) {
      this.$emit('keypress', event)
    },

    clear () {
      this.autocompleteText = ''
    },

    focus () {
      this.$refs.autocomplete.focus()
    },

    blur () {
      this.$refs.autocomplete.blur()
    },

    update (value) {
      this.autocompleteText = value
    },

    geolocate () {
      if (this.enableGeolocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          })

          this.autocomplete.setBounds(circle.getBounds())
        })
      }
    }
  },
  mounted () {
    const options = {
      types: [this.types]
    }

    if (this.country) {
      options.componentRestrictions = {
        country: this.country,
      }
    }

    /*  eslint no-undef: 0  */
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(this.id),
      options,
    )

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()

      if (!place.geometry) {
        this.$emit('no-results-found', place)
        return false
      }

      let addressComponents = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      }

      let returnData = {}

      if (place.address_components !== undefined) {
        console.log('true')
        // Get each component of the address from the place details
        for (let i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0]

          if (addressComponents[addressType]) {
            let val = place.address_components[i][addressComponents[addressType]]
            returnData[addressType] = val
          }
        }

        returnData['latitude'] = place.geometry.location.lat()
        returnData['longitude'] = place.geometry.location.lng()

        // return returnData object and PlaceResult object
        this.$emit('placechanged', returnData, place)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
