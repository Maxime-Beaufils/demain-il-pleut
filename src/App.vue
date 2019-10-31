<template>
  <div id="app">
    <b-field>
            <b-input v-model="place" placeholder="Ville..."></b-input>
        </b-field>
    <b-button type="is-info" @click="getCoordonate(place)">Get weather</b-button>
    <p>This component’s code is in {{ weather_data }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      place: '',
    }
  },
  methods: {
    ...mapActions(['getWeatherData', 'getCoordonate']),
  },
  computed: {
    ...mapGetters(['weather_data']),
  },
}
</script>

<style>

</style>