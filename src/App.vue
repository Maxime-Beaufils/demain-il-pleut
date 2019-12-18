<template>
  <div id="app">
    <div class="columns is-gapless">
      <div class="column is-4 left_panel">
        <section class="hero is-small is-info is-bold">
          <div class="hero-body">
            <div class="container">
              <h1
                class="title has-text-centered is-size-3 has-text-weight-light"
              >
                Demain il pleut
              </h1>
              <h2
                class="subtitle has-text-centered is-size-5 has-text-weight-light"
              >
                <i class="fas fa-umbrella"></i> Votre app météo
              </h2>
              <p class="has-text-centered is-size-4">
                <i class="fas fa-compass"></i>&nbsp;&nbsp;{{ current_place }}
              </p>
              <br />
              <b-field>
                <b-input
                  v-model="place"
                  expanded
                  placeholder="Ville..."
                  icon-pack="fas"
                  icon="search"
                ></b-input>
                <b-button
                  class="is-info"
                  @click="getCoordonateThenGetWeatherData(place)"
                >
                  <i class="fab fa-searchengin"></i>
                </b-button>
              </b-field>
            </div>
          </div>
        </section>
        <div class="columns is-mobile nav">
          <div class="column has-text-centered">
            <b-button class="btn-nav" type="is-info" tag="router-link" to="/">
            <i class="far fa-clock"></i> <br>minute</b-button>
          </div>
          <div class="column has-text-centered">
            <b-button  class="btn-nav" type="is-info" tag="router-link" to="/heure">
            <i class="fas fa-hourglass-half"></i> <br> heure</b-button>
          </div>
          <div class="column has-text-centered">
            <b-button  class="btn-nav" type="is-info" tag="router-link" to="/jour">
            <i class="far fa-calendar-alt"></i> <br> jour</b-button>
          </div>
        </div>
        <br />
        <currently></currently>
      </div>

      <div class="column is-8 right_panel">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currently from "./components/currently.vue";
export default {
  components: {
    currently: currently
  },

  data() {
    return {
      place: ""
    };
  },
  methods: {
    async getCoordonateThenGetWeatherData(place) {
      await this.$store.dispatch("getCoordonate", place);
      this.$store.dispatch("getWeatherData");
    }
  },
  computed: {
    ...mapGetters(["weather_data", "current_place"])
  }
};
</script>

<style>
a p {
  font-family: Helvetica, sans-serif;
}
.left_panel {
  background-color: white;
  
}
.right_panel {
  background-color: rgb(238, 238, 238);
  height: 100vh;
}
.title {
  font-family: "Pacifico", cursive;
}
.subtitle {
  margin-top: -0.8em !important;
}
.fa-meteor {
  color: white;
}
.fa-compass {
  font-size: 2rem;
  color: white;
}
.nav {
  margin-top: 2vh !important;
}
.router-link-exact-active {
  background-color: white !important;
  color:hsl(217, 71%, 53%) !important;
  box-shadow: 2px 2px 5px rgb(109, 109, 109) !important;
}
.columns {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
@media screen and (max-width: 420px)
{
  .btn-nav {
  height: 100px !important;
  width: 15vw !important;
  box-shadow: 2px 2px 5px rgb(167, 199, 251) !important;
  }
}
@media screen and (min-width: 420px)
{
  .btn-nav {
  height: 100px !important;
  width: 10vw !important;
  box-shadow: 2px 2px 5px rgb(167, 199, 251) !important;
  }
}
@media screen and (min-width: 768px)
{
 
.btn-nav {
  height: 100px !important;
  width: 7vw !important;
  box-shadow: 2px 2px 5px rgb(167, 199, 251) !important;
}
}
</style>
