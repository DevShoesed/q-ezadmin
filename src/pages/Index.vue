<template>
  <q-page class="container bg-grey-2">
    <div v-if="!loading">
      <div class="bg-primary">
        <div class="q-pa-sm doc-container">
          <div class="column items-end">
            
          </div>
        </div>
        <div class="q-pa-sm row q-col-gutter-xs">
          <div 
            class="col q-ma-xs bg-white" 
            v-for="(env, key) in envs"
            :key="key"
          >
            <q-item
              v-ripple
              clickable
            >
              <q-item-section>
                {{ env.name }}
                <div class="text-caption text-grey-7" style="font-size: 0.6rem">last update: {{ env.lastUpdate }}</div>
              </q-item-section>
        
              <q-item-section side>
                <q-icon name="circle" :color="env.status == 'online' ? 'green' : 'grey-5' " />
              </q-item-section>

            </q-item>
          </div>
        </div>
      </div>
      <div class="row q-pa-sm q-col-gutter-xs">
        <div class="col-xs-6 col-md-6 col-lg-6 col-xl-6">
          <mini-card 
            name="Today Orders"
            :value="todayOrder"
            icon="shopping_cart"
            color="primary"
          />
        </div>
        <div class="col-xs-6 col-md-6 col-lg-6 col-xl-6">
          <mini-card 
            name="Today Total"
            :value="todayTotal"
            icon="euro_symbol"
            color="primary"
          />
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6 col-xl-6">
          <mini-card 
            name="Today Login"
            :value="todayLogin"
            icon="login"
            color="primary"
          />
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6 col-xl-6">
          <mini-card 
            name="Today Errors"
            :value="todayErrors"
            icon="error"
            color="primary"
          />
        </div>

      </div>
      <div class="row q-pa-sm q-col-gutter-xs">
        <div class="col-xs-12 col-md-6">
          <q-card>
            <q-card-section class="text-uppercase text-subtitle2 text-secondary">
              Orders
            </q-card-section>
            <q-card-section>
              <apexchart id="chartOrder" :options="optionsNumber" :series="newSeriesNumber"></apexchart>
            </q-card-section>
          </q-card>  
        </div>
        <div class="col-xs-12 col-md-6">
          <q-card>
            <q-card-section class="text-uppercase text-subtitle2 text-secondary">
              Total
            </q-card-section>
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
      intervalObj: null,
      todayLogin: 0,
      todayErrors: 0,
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
            show: false
          }
        },
        title: {
          text: 0,
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Last 15 days',
          style: {
            fontSize: "10px"
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
    ...mapActions('store', ['firebaseGetEnvs', 'apiGetErrors', 'updateEnvsStatus']),
    apiLoadStats() {
      Object.values(this.envs).forEach(element => {
        const endpoint = element.apiUrl + "/server.php?";
        let today = new Date()
        const DataInizio = date.formatDate(today.setDate(today.getDate() - 15), "YYYY-MM-DD");
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
            dataLabels: {
              enabled: true,
            },
            title: {
              text: this.newSeriesNumber[0].data.reduce((sum, x) => sum + x.y, 0),
              style: {
                fontSize: "24px"
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
            dataLabels: {
              enabled: true,
              formatter: function(val, opt) {
                return Intl.NumberFormat('en', { notation: 'compact' }).format(val)
              }
            },
            title: {
              text: Intl.NumberFormat('en', { notation: 'compact' }).format(this.newSeriesTotal[0].data.reduce((sum, x) => sum + x.y, 0)),
              style: {
                fontSize: "24px"
              }
            }
          }
        }
    },
    todayOrder: function() {
      const data = this.newSeriesNumber[0].data
      return data[data.length-1] ? data[data.length-1].y : 0
    },
    todayTotal: function() {
      const data = this.newSeriesTotal[0].data
      return data[data.length-1] ? data[data.length-1].y : 0
    },
  },
  async mounted() {
    this.loading = true
    this.intervalObj = setInterval(() => { this.updateEnvsStatus() }, 20000)
    await this.firebaseGetEnvs()
      .then(() => this.apiGetErrors())
      .then(() => this.apiLoadStats())
      .then(() => this.loading = false )
    
    
  },
  beforeDestroy() {
    clearInterval(this.intervalObj)
  },
  components: {
    MiniCard: () => import('components/MiniCard'),
    apexchart: VueApexCharts,
  }
}
</script>
