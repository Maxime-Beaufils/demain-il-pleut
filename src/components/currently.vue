<template>
  <div class="container">
    <b-collapse class="card" :open="true" aria-id="contentIdForA11y3">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header  has-text-centered"
        role="button"
        aria-controls="contentIdForA11y3"
      >
        <p class="card-header-title">
          En ce moment à {{ moment.unix(weather_data.data.currently.time).format("HH:mm") }}
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'chevron-up' : 'chevron-down'">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column summary">
              <p class="is-size-4 has-text-centered has-text-weight-bold">
                
                {{ weather_data.data.currently.summary }}
              </p>
            </div>
            <div class="column summary-temp">
              <p class="is-size-3 has-text-centered has-text-weight-bold">
                <i class="fas fa-thermometer-half"></i> &nbsp;{{ weather_data.data.currently.temperature }} °C
              </p>
              <p class="is-size-6 has-text-centered">
                ressentie: &nbsp;&nbsp; 
                {{ weather_data.data.currently.apparentTemperature }} °C
              </p>
            </div>
          </div>
          <table class="table is-bordered pression">
            <thead>
              <tr>
                <th>Précipitation</th>
                <th>Probabilité de précipitation</th>
                <th>Couverture nuageuse</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ weather_data.data.currently.precipIntensity }} mm</th>
                <th>
                  {{
                    weather_data.data.currently.precipProbability * 100
                  }}&nbsp;%
                </th>
                <th>
                  {{ (weather_data.data.currently.cloudCover * 100).toFixed(2) }}&nbsp; %
                </th>
              </tr>
            </tbody>
          </table>
          <table class="table is-bordered pression">
            <thead>
              <tr>
                <th>Vitesse du vent</th>
                <th>Rafale</th>
                <th>direction du vent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ weather_data.data.currently.windSpeed }} km/h</th>
                <th>{{ weather_data.data.currently.windGust }} km/h</th>
                <th>
                  {{ degreeToCardinalDirection(weather_data.data.currently.windBearing) }}
                </th>
              </tr>
            </tbody>
          </table>
          <table v-if="weather_data.data.currently.nearestStormDistance" class="table is-bordered pression">
            <thead>
              <tr>
                <th>Distance de la tempête <br> la plus proche </th>
                <th>Direction de la tempête</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ weather_data.data.currently.nearestStormDistance }} km</th>
                <th>
                  {{ degreeToCardinalDirection(weather_data.data.currently.nearestStormBearing) }}
                </th>
              </tr>
            </tbody>
          </table>
          <table class="table is-bordered pression">
            <thead>
              <tr>
                <th>Humidité</th>
                <th>Pression</th>
                <th>Point de rosée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ (weather_data.data.currently.humidity * 100).toFixed(2) }}&nbsp;%</th>
                <th>{{ weather_data.data.currently.pressure }} hPa</th>
                <th>{{ weather_data.data.currently.dewPoint }}&nbsp; °C</th>
              </tr>
            </tbody>
          </table>
          <table class="table is-bordered pression">
            <thead>
              <tr>
                <th>Indice UV</th>
                <th>Visibilité</th>
                <th>Ozone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ weather_data.data.currently.uvIndex }}</th>
                <th>{{ weather_data.data.currently.visibility }} &nbsp; km</th>
                <th>{{ weather_data.data.currently.ozone }} &nbsp; DU</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["weather_data"]),
    ...mapGetters(["degreeToCardinalDirection"])
  },
};
</script>

<style scoped>
.card-header {
  background-color: hsl(217, 71%, 53%);
}
.card-header-title {
  color: white;
  text-align: center;
}
.card-header-icon {
  color: white;
}
.summary {
  color: hsl(217, 71%, 53%);
  box-shadow: -2px 2px 5px rgb(211, 228, 255);
}
.summary-temp {
  color: white;
  background-color: hsl(217, 71%, 53%);
  box-shadow: 2px 2px 5px rgb(211, 228, 255);
}
.summary-temp :first-child {
  margin-bottom: 0;
}
.pression {
  border-color: hsl(217, 71%, 53%) !important;
  box-shadow: 2px 2px 5px rgb(211, 228, 255);
}
.pression thead {
  background-color: hsl(217, 71%, 53%);
}
.pression thead tr th {
  text-align: center;
  color: white;
}
.pression tbody tr th {
  text-align: center;
  color: hsl(217, 71%, 53%);
}</style>
