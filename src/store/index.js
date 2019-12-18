import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weather_data:   { data: { currently: {}, minutely: {}, hourly: {}, daily: {} }},
    coordonate:     [49.182863, 0.370679],
    dark_api_url:   "https://api.darksky.net/forecast",
    current_place:  "Caen",
    error:          ""
  },
  getters: {
    weather_data: state => {
      return state.weather_data;
    },
    current_place: state => {
      return state.current_place;
    }
  },
  mutations: {
    setCoordonate: (state, coor) => {
      state.coordonate = coor;
    },
    setCurrentPlace: (state, place) => {
      state.current_place = place;
    },
    setWeatherData: (state, data) => {
      state.weather_data = data;
    },
    setError: (state, err) => {
      state.error = err;
    }
  },
  actions: {
    getCoordonate: async (context, place) => {
      let formatPlace = place.replace(/\s+/g, "-").toLowerCase();
      context.commit('setCurrentPlace', formatPlace);
      let response = await Axios.get(
        "https://geocode.xyz/" + formatPlace + "?geoit=JSON"
      );
      let coor = [response.data.latt, response.data.longt];
      context.commit("setCoordonate", coor);
    },

    getWeatherData: async context => {
      let data = await Axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          context.state.dark_api_url +
          "/" +
          process.env.VUE_APP_SKY +
          "/" +
          context.state.coordonate[0] +
          "," +
          context.state.coordonate[1] +
          "?lang=fr" +
          "&units=ca"
      );
      context.commit("setWeatherData", data);
    },
    getError: (context, err) => {
      context.commit("setError", err);
    }
  },
  modules: {}
});
