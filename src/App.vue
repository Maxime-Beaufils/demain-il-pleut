<template>
  <div id="app">
    <b-field>
            <b-input v-model="place" placeholder="Ville..." icon-pack="fas" icon="search"></b-input>
    </b-field>
    <b-button type="is-info" @click="getCoordonate(place); getWeatherData()">Get weather</b-button>
    <br/>
    <b-button tag="router-link"
                to="/"
                type="is-link">
                home
            </b-button>
            <b-button tag="router-link"
                to="/heure"
                type="is-info">
                heure
            </b-button>

    <router-view/>
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