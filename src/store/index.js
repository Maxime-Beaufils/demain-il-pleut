import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weather_data: {
      data: { currently: {}, minutely: {}, hourly: {}, daily: {} }
    },
    coordonate: [49.182863, -0.35],
    dark_api_url: "https://api.darksky.net/forecast",
    current_place: "Caen",
    error: ""
  },
  getters: {
    weather_data: state => {
      return state.weather_data;
    },
    current_place: state => {
      return state.current_place;
    },
    minutely_loading: state => {
      return state.weather_data.data.minutely ? true : false;
    },
    minutely_chart_data: state => {
      let timeLabels = [],
        precipitation = [],
        precipitationProbality = [];
      const dataArr = state.weather_data.data.minutely.data;
      if (dataArr) {
        dataArr.forEach(el => {
          timeLabels.push(moment.unix(el.time).format("HH:mm"));
          precipitation.push(el.precipIntensity);
          precipitationProbality.push(el.precipProbability * 100);
        });
      }
      let chartData = {
        labels: timeLabels,
        datasets: [
          {
            label: "Précipitation en milimétre",
            backgroundColor: "#3273DC",
            yAxisID: 'precipitation',
            data: precipitation
          },
          {
            label: "Probabilité de précipitation",
            backgroundColor: "#ffb733",
            yAxisID: 'probabilite',
            data: precipitationProbality
          }
        ]
      };

      return chartData;
    },
    hourly_weather_data: state => {
      return state.weather_data.data.hourly
    },

    hourly_chart_data: state => {
      let timeLabels = [],
        precipitation = [],
        precipitationProbality = [],
        temperature = [];
      const dataArr = state.weather_data.data.hourly.data;
      if (dataArr) {
        dataArr.forEach(el => {
          timeLabels.push(moment.unix(el.time).format("HH:mm"));
          precipitation.push(el.precipIntensity);
          precipitationProbality.push(el.precipProbability * 100);
          temperature.push(el.temperature)
        });
      }
      let chartData = {
        labels: timeLabels,
        datasets: [
          {
            label: "Précipitation en milimétre",
            backgroundColor: "#3273DC",
            yAxisID: 'precipitation',
            data: precipitation
          },
          {
            label: "Probabilité de précipitation",
            backgroundColor: "#ffb733",
            yAxisID: 'probabilite',
            data: precipitationProbality
          },
          {
            label: "Température en °C",
            yAxisID: 'temperature',
            backgroundColor: "#E1ECFF",
            data: temperature
          }
        ]
      };

      return chartData;
    },
    daily_weather_data: state => {
      return state.weather_data.data.daily
    },
    daily_chart_data: state => {
      let timeLabels = [],
        precipitation = [],
        precipitationProbality = [];
      const dataArr = state.weather_data.data.daily.data;
      if (dataArr) {
        dataArr.forEach(el => {
          timeLabels.push(moment.unix(el.time).format("DD/MM"));
          precipitation.push(el.precipIntensity);
          precipitationProbality.push(el.precipProbability * 100);
        });
      }
      let chartData = {
        labels: timeLabels,
        datasets: [
          {
            label: "Précipitation en milimétre",
            backgroundColor: "#3273DC",
            yAxisID: 'precipitation',
            data: precipitation
          },
          {
            label: "Probabilité de précipitation",
            backgroundColor: "#ffb733",
            yAxisID: 'probabilite',
            data: precipitationProbality
          }
        ]
      };

      return chartData;
    },
    degreeToCardinalDirection: function() {
      return (degree) => {
        const direction = [
          "N (nord)",
          "NNE (nord-nord-est)",
          "NE (nord-est)",
          "ENE (est-nord-est)",
          "E (est)",
          "ESE (est-sud-est)",
          "SE (sud-est)",
          "SSE (sud-sud-est)",
          "S (sud)",
          "SSO (sud-sud-ouest)",
          "SO (sud-ouest)",
          "OSO (ouest-sud-ouest)",
          "O (ouest)",
          "ONO (ouest-nord-ouest)",
          "NO (nord-ouest)",
          "NNO (nord-nord-ouest)"
        ];
        return direction[Math.round(degree / 22.5)];
      }
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
      context.commit("setCurrentPlace", formatPlace);
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
