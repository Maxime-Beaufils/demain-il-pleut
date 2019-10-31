<template>
  <div id="app">
    <b-button type="is-info" @click="getWeatherData">Get weather</b-button>
    <p>This component’s code is in {{ weather_data.data.currently }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['getWeatherData']),
  },
  computed: {
    ...mapGetters(['weather_data']),
  },
}
</script>

<style>

</style>