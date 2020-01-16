<template>
  <div class="container">
    <div v-if="minutely_loading" class="chart">
      <div class="summary">
        <h2 class="is-4">{{ weather_data.data.minutely.summary }}</h2>
      </div>
      <line-chart class="chartGraph"
        :chartData="minutely_chart_data"
        :options="this.lineOptions"
      ></line-chart>
    </div>
    <div v-else>
      <p>les prévisions dès prochaines minutes ne sont pas disponible</p>
    </div>
    <!-- {{ minutely_chart_data }} -->
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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        elements: {
          line: {
            fill: true
          }
        }
      }
    };
  },
  computed: {
    ...mapState(["weather_data"]),
    ...mapGetters(["minutely_loading", "minutely_chart_data"])
  }
};
</script>

<style scoped>
@media screen and (max-width: 420px) {
  .chart {
    margin: auto;
    width: 90%;
  }
}
@media screen and (min-width: 420px) {
  .chart {
    margin: auto;
    width: 70%;
  }
}

.chartGraph {
  background-color: white;
  box-shadow: 1px 1px 8px rgb(233, 233, 233);
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
</style>
