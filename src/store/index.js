import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather_data: {ciel : "pluie"},
    coordonate: [49.182863, 0.370679],
    dark_api_url: "https://api.darksky.net/forecast"
  },
  getters : {
    weather_data : state => {
      return state.weather_data;
    }
  },
  mutations : {
    setCoordonate : (state, coor) => {
      state.coordonate = coor
    },
    setWeatherData : (state, data) => {
      state.weather_data = data 
    }
  },
  actions : {
    getCoordonate : async (context, place) => { // place = adresse recherchée de l'utilisateur via search imput
      context;
      place;
    },

    getWeatherData :  async (context) => {
      let data = await Axios.get('https://cors-anywhere.herokuapp.com/' +
                                 context.state.dark_api_url + '/' +
                               `${process.env.VUE_APP_SKY}` + '/' +
                                context.state.coordonate[0] + ',' +
                                context.state.coordonate[1] + 
                                '?lang=fr' +
                                '&units=si')
      context.commit('setWeatherData', data)
    }
  },
  modules: {
  }
})
