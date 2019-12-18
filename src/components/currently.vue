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
          En ce moment
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
                <i class="fas fa-cloud"></i> &nbsp; <br />
                {{ weather_data.data.currently.summary }}
              </p>
            </div>
            <div class="column summary-temp">
              <p class="is-size-3 has-text-centered has-text-weight-bold">
                {{ weather_data.data.currently.temperature }} °C
              </p> 
              <p class="is-size-6 has-text-centered">
                ressentie: &nbsp;
                {{ weather_data.data.currently.apparentTemperature }} °C
              </p>
            </div>
          </div>
          <table class="table pression">
            <thead>
              <tr>
                <th>Humidité</th>
                <th>Pression</th>
                <th>Point de rosée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ weather_data.data.currently.humidity * 100 }}&nbsp;%</th>
                <th>{{ weather_data.data.currently.pressure }}</th>
                <th>{{ weather_data.data.currently.dewPoint }}&nbsp; °C</th>
              </tr>
            </tbody>
          </table>
          {{ weather_data.data.currently }}
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          à {{ moment(weather_data.data.currently.time).format("HH:mm:ss") }}
        </p>
      </footer>
    </b-collapse>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["weather_data"])
  }
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
}</style
>>
