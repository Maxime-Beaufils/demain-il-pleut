<template>
  <div class="countainer">
    <div class="wrapper">
      <div class="summary">
        <h2 class="is-4">{{ hourly_weather_data.summary }}</h2>
      </div>
      <line-chart
        class="chartGraph"
        :chartData="hourly_chart_data"
        :options="this.lineOptions"
      ></line-chart>
      
      <b-table
        :data="data"
        ref="table"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="heure"
        @details-open="
          (row, index) => $buefy.toast.open(`Expanded ${row.user.first_name}`)
        "
        :show-detail-icon="showDetailIcon"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="user.first_name" label="First Name" sortable>
            <template v-if="showDetailIcon">
              {{ props.row.user.first_name }}
            </template>
            <template v-else>
              <a @click="toggle(props.row)">
                {{ props.row.user.first_name }}
              </a>
            </template>
          </b-table-column>

          <b-table-column field="user.last_name" label="Last Name" sortable>
            {{ props.row.user.last_name }}
          </b-table-column>

          <b-table-column field="date" label="Date" sortable centered>
            <span class="tag is-success">
              {{ new Date(props.row.date).toLocaleDateString() }}
            </span>
          </b-table-column>

          <b-table-column label="Gender">
            <span>
              <b-icon
                pack="fas"
                :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
              >
              </b-icon>
              {{ props.row.gender }}
            </span>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="/static/img/placeholder-128x128.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong
                    >{{ props.row.user.first_name }}
                    {{ props.row.user.last_name }}</strong
                  >
                  <small>@{{ props.row.user.first_name }}</small>
                  <small>31m</small>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ornare magna eros, eu pellentesque tortor vestibulum ut.
                  Maecenas non massa sem. Etiam finibus odio quis feugiat
                  facilisis.
                </p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>
    heure : {{ weather_data.data.hourly }}
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
    ...mapGetters(["hourly_chart_data", "hourly_weather_data"])
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
</style>
