<template>
  <div id="app">
    <div class="columns">
      <div class="column is-4">
        <article class="panel is-info">
          <p class="panel-heading">{{ place }}</p>

          <div class="panel-block">
            <b-field>
              <b-input v-model="place" placeholder="Ville..." icon-pack="fas" icon="search"></b-input>
              <b-button type="is-info" @click="getCoordonate(place); getWeatherData()"><i class="fab fa-searchengin"></i></b-button>
            </b-field>
          </div>
        </article>

        <br />
        <b-button tag="router-link" to="/" type="is-info">minute</b-button>
        <b-button tag="router-link" to="/heure" type="is-info">heure</b-button>
        <b-button tag="router-link" to="/jour" type="is-info">jour</b-button>
        <br />
        {{ weather_data.data.currently}}
      </div>
      <div class="column is-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      place: ""
    };
  },
  methods: {
    ...mapActions(["getWeatherData", "getCoordonate"])
  },
  computed: {
    ...mapGetters(["weather_data"])
  }
};
</script>

<style>
</style>