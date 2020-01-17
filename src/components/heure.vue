<template>
  <div class="countainer">
    <div class="wrapper">
      <div class="summary">
        <h2 class="is-4">{{ hourly_weather_data.summary }}</h2>
      </div>
      <div class="chartGraph">
        <line-chart
          :chartData="hourly_chart_data"
          :options="this.lineOptions"
        ></line-chart>
      </div>

      <b-table
        :data="hourly_weather_data.data"
        ref="table"
        :opened-detailed="this.defaultOpenedDetails"
        detailed
        detail-key="time"
        :show-detail-icon="true"
        paginated
        per-page="13"
        :striped="true"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        >
        <template slot-scope="props">
          <b-table-column field="heure" label="heure" centered>
            <b-tag type="is-info" size="is-medium">
              <b-icon
                pack="fas"
                icon="clock"
                size="is-small"
                style="margin-right: 5px"
              >
              </b-icon>
              {{ moment.unix(props.row.time).format("HH:mm") }}</b-tag
            >
          </b-table-column>

          <b-table-column field="summary" label="Sommaire" centered>
            {{ props.row.summary }}
          </b-table-column>

          <b-table-column
            field="precipIntensity"
            label="Précipitation"
            centered
          >
            <b-tag type="is-info" size="is-medium">
              {{ props.row.precipIntensity }} mm
            </b-tag>
          </b-table-column>

          <b-table-column field="temperature" label="température" centered>
            <b-tag type="is-info" size="is-medium"
              >{{ props.row.temperature }} °C</b-tag
            >
          </b-table-column>

          <b-table-column field="windSpeed" label="Vitesse du vent" centered>
            <b-tag type="is-info" size="is-medium"
              >{{ props.row.windSpeed }} km/h</b-tag
            >
          </b-table-column>
        </template>
        <!-- DETAILS -->
        <template slot="detail" slot-scope="props">
          <article class="detailHourly">
            <div class="content">
              <!-- TEMPERATURE -->
              <b-field grouped group-multiline>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Température</b-tag>
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.temperature }} °C</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium"
                      >Température ressentie</b-tag
                    >
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.apparentTemperature }} °C</b-tag
                    >
                  </b-taglist>
                </div>
              </b-field>
              <!-- PRECIPITATION -->
              <b-field grouped group-multiline>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Précipitation</b-tag>
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.precipIntensity }} mm</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium"
                      >Probabilité de précipitation</b-tag
                    >
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.precipProbability * 100 }}&nbsp;%</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium"
                      >Couverture nuageuse</b-tag
                    >
                    <b-tag type="is-info" size="is-medium">
                      {{ (props.row.cloudCover * 100).toFixed(2) }}&nbsp;
                      %</b-tag
                    >
                  </b-taglist>
                </div>
              </b-field>
              <!-- VENT -->
              <b-field grouped group-multiline>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium"
                      >Vitesse du vent</b-tag
                    >
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.windSpeed }} km/h</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Rafale</b-tag>
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.windGust }} km/h</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium"
                      >direction du vent</b-tag
                    >
                    <b-tag type="is-info" size="is-medium">
                      {{
                        degreeToCardinalDirection(props.row.windBearing)
                      }}</b-tag
                    >
                  </b-taglist>
                </div>
              </b-field>
              <!-- HUMIDITE -->
              <b-field grouped group-multiline>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Humidité</b-tag>
                    <b-tag type="is-info" size="is-medium">
                      {{ (props.row.humidity * 100).toFixed(2) }}&nbsp;%</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Pression</b-tag>
                    <b-tag type="is-info" size="is-medium"
                      >{{ props.row.pressure }}&nbsp; hPa</b-tag
                    >
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium"
                      >Point de rosée</b-tag
                    >
                    <b-tag type="is-info" size="is-medium">
                      {{ props.row.dewPoint }}&nbsp;°C</b-tag
                    >
                  </b-taglist>
                </div>
              </b-field>
            </div>
          </article>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import lineChart from "./lineChart";

export default {
  components: { lineChart },
  data() {
    return {
      lineOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: "precipitation",
              type: "linear",
              position: "left",
              ticks: {
                beginAtZero: true,
                fontColor: "#3273DC",
                callback: function(value) {
                  return value + " mm";
                }
              }
            },
            {
              id: "probabilite",
              type: "linear",
              position: "right",
              ticks: {
                max: 100,
                min: 0,
                fontColor: "#ffb733",
                callback: function(value) {
                  return value + " %";
                }
              }
            },
            {
              id: "temperature",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: "#FFFFF",
                callback: function(value) {
                  return value + " °C";
                }
              }
            }
          ]
        },
        elements: {
          line: {
            fill: true
          },
          point: {
            radius: 0
          }
        }
      },
      defaultOpenedDetails: [1],
      showDetailIcon: true
    };
  },
  computed: {
    ...mapState(["weather_data"]),
    ...mapGetters([
      "hourly_chart_data",
      "hourly_weather_data",
      "degreeToCardinalDirection"
    ])
  }
};
</script>

<style scoped>
@media screen and (max-width: 420px) {
  .wrapper {
    margin: auto;
    width: 90%;
  }
}
@media screen and (min-width: 420px) {
  .wrapper {
    margin: auto;
    width: 70%;
  }
}
.summary {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: hsl(217, 71%, 53%);
  padding: 1vh 0;
  margin-top: 2vh;
  margin-bottom: 2vh;
  box-shadow: 2px 2px 5px rgb(167, 199, 251);
}
.chartGraph {
  margin-bottom: 2vh;
}
</style>
