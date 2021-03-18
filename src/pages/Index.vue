<template>
  <q-page class="container bg-grey-2">
    <div v-if="!loading">
      <div class="bg-primary">
        <div class="q-pa-sm doc-container">
          <div class="column items-end">
            
          </div>
        </div>
        <div class="q-pa-sm row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-6 col-lg-3">
            <mini-card
                v-if="!loading"
                :value="numberEnvs"
                name="Environments"
                icon="apps"
                color="accent"
              />
              <q-skeleton 
                v-else 
                width="200px" 
                height="100px" 
              />
          </div>
          <div class="col-xs-12 col-xs-12 col-sm-6 col-lg-3">
            <mini-card
                v-if="!loading"
                :value="numErrors"
                name="Errors"
                icon="error_outline"
                color="accent"
              />
              <q-skeleton 
                v-else 
                width="200px" 
                height="100px" 
              />
          </div>
        </div>
      </div>
      <div class="row q-pa-lg">
        <div class="col-md-4">
          <q-card>
            <q-card-section>
              <apexchart :options="options" :series="series"></apexchart>
            </q-card-section>
          </q-card>  
        </div>
      </div>
    </div>
    <div v-else>
      <q-spinner-hourglass
        color="primary"
        size="xl"
      />
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import  { mapActions, mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'


export default {
  name: 'PageIndex',
  data() {
    return {
      loading: false,
      options: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: 0
        },
        subtitle: {
          text: 'Orders',
          offsetX: 0,
          style: {
            fontSize: '14px',
          }
        },
        title: {
          text: 0,
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
      },
      series: [],
    }
  },
  methods: {
    ...mapActions('store', ['firebaseGetEnvs', 'apiGetErrors']),
    apiLoadStats() {
      Object.values(this.envs).forEach(element => {
        const endpoint = element.apiUrl + "/server.php?";
        const DataInizio = date.formatDate(this.dateRange.from, "YYYY-MM-DD");
        const DataFine = date.formatDate(this.dateRange.to, "YYYY-MM-DD");
        this.$axios
          .get(endpoint, {
            params: {
              action: "Stat_AndamentoOrdini",
              tipo: "D",
              DataInizio: DataInizio,
              DataFine: DataFine,
              sintetico: 0
            }
          })
          .then(response => {
            const data = response.data.data;
            if(data.labels)
            {
              const newTotal = data.numeroOrdini_APP.reduce((t, el) => parseInt(t) + parseInt(el), this.options.title.text)
              this.options = {...this.options, ...{
                xaxis: {
                  categories: data.labels
                },
                title: {
                  text: newTotal
                }
              }}

              let newSeries = []
              data.numeroOrdini_APP.map((el, i) => newSeries.push(
                this.series[1] ? this.series[1].data[i] : 0 + parseInt(el)
              ))
              this.series = [
                {
                  name: 'Orders',
                  data: newSeries
                }
              ]
             }
             
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  },
  computed: {
    ...mapGetters('store', ['numberEnvs', 'numErrors','envs', 'dateRange'])
  },
  async mounted() {
    this.loading = true
    await this.firebaseGetEnvs()
      .then(() => this.apiGetErrors())
      .then(() => this.apiLoadStats())
    this.loading = false
  },
  components: {
    MiniCard: () => import('components/MiniCard'),
    apexchart: VueApexCharts,
  }
}
</script>
