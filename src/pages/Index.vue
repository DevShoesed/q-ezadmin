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
        <div class="col-md-4 q-pr-xs">
          <q-card>
            <q-card-section>
              <apexchart id="chartOrder" :options="optionsNumber" :series="newSeriesNumber"></apexchart>
            </q-card-section>
          </q-card>  
        </div>
        <div class="col-md-4 q-pl-xs">
          <q-card>
            <q-card-section>
              <apexchart id="chartTotal" :options="optionTotal" :series="newSeriesTotal"></apexchart>
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
      optionsChart: {
        chart: {
          type: 'area',
          group: 'orders',
          height: 150,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 1,
        },
        yaxis: {
          min: 0,
          labels: {
            show: false,
            minWidth: 40
          }
        },
        subtitle: {
          text: 'This mounth',
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
        noData: {
          text: 'Loading'
        }
      },
      seriesNumber: [],
      seriesTotal: []
    }
  },
  methods: {
    ...mapActions('store', ['firebaseGetEnvs', 'apiGetErrors']),
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    apiLoadStats() {
      Object.values(this.envs).forEach(element => {
        const endpoint = element.apiUrl + "/server.php?";
        const DataInizio = date.formatDate(date.startOfDate(new Date(), 'month'), "YYYY-MM-DD");
        const DataFine = date.formatDate(new Date(), "YYYY-MM-DD");

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
            if(data.numeroOrdini_APP) 
            {
              this.seriesNumber.push(data.numeroOrdini_APP.map((el, i) => {
                return {
                  x: data.labels[i],
                  y: el
                }
              }))
              this.seriesTotal.push(data.TotaleOrdini_APP.map((el, i) => {
                return {
                  x: data.labels[i],
                  y: el
                }
              }))
            }             
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  },
  computed: {
    ...mapGetters('store', ['numberEnvs', 'numErrors','envs', 'dateRange']),
    newSeriesNumber: function() {
      const n = this.seriesNumber.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      const data = result.map((_, i) => this.seriesNumber.map(xs => xs[i] || 0).reduce((sum, x) => 
         {
          return {
            x: x.x,
            y: sum.y + parseInt(x.y)
          }
        }
        , {x: 0, y: 0})
      );
      return [{
        name: 'Orders',
        data: data
      }]
    },
    newSeriesTotal: function() {
      const n = this.seriesTotal.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      const data = result.map((_, i) => this.seriesTotal.map(xs => xs[i] || 0).reduce((sum, x) => 
         {
          return {
            x: x.x,
            y: sum.y + parseInt(x.y)
          }
        }
        , {x: 0, y: 0})
      );
      return [{
        name: 'Total',
        data: data
      }]
    },
    optionsNumber: function() 
      {
        return {
          ...this.optionsChart, 
          ...{
            title: {
              text: this.newSeriesNumber[0].data.reduce((sum, x) => sum + x.y, 0),
              style: {
                fontSize: "24px"
              }
            },
            subtitle: {
              text: 'Orders',
              style: {
                fontSize: "14px"
              }
            }
          }
        }
    },
    optionTotal: function() 
      {
        return {
          ...this.optionsChart, 
          ...{
            title: {
              text: this.formatPrice(this.newSeriesTotal[0].data.reduce((sum, x) => sum + x.y, 0)),
              style: {
                fontSize: "24px"
              }
            },
            subtitle: {
              text: 'Totale',
              style: {
                fontSize: "14px"
              }
            }
          }
        }
    },
  },
  async mounted() {
    this.loading = true
    await this.firebaseGetEnvs()
      .then(() => this.apiGetErrors())
      .then(() => this.apiLoadStats())
      .then(() => this.loading = false )
    
    
  },
  components: {
    MiniCard: () => import('components/MiniCard'),
    apexchart: VueApexCharts,
  }
}
</script>
