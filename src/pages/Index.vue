<template>
  <q-page class="container bg-grey-2">

      <div class="bg-primary">
        <div class="q-pa-xs row q-col-gutter-xs">
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

      <h5 class="row q-pt-lg q-pl-lg text-primary q-mt-none q-mb-xs">Today Stats</h5>
      <div class="row q-pa-lg">
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-mb-xs">
          <mini-card 
            name="Orders"
            :value="todayOrder"
            icon="shopping_cart"
            color="secondary"
            
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-mb-xs">
          <mini-card 
            name="Total"
            :value="todayTotal"
            icon="euro_symbol"
            color="secondary"
          />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-mb-xs">
          <mini-card 
            name="Logins"
            :value="todayLogin"
            icon="login"
            color="secondary"
          />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 q-mb-xs">
          <mini-card 
            name="Errors"
            :value="todayErrors"
            icon="error"
            color="secondary"
          />
        </div> 

      </div>
      <div class="row q-pa-lg q-col-gutter-md">
        <div class="col-xs-12 col-md-6 col-lg-4 col-xl-4">
          <q-card>
            <q-card-section class="q-pa-none q-ma-none">
              <apexchart id="chartOrder" :options="optionsNumber" :series="newSeriesNumber"></apexchart>
            </q-card-section>
          </q-card>  
        </div>
        
        <div class="col-xs-12 col-md-6 col-lg-4 col-xl-4">
          <q-card>
            <q-card-section class="q-pa-none q-ma-none">
              <apexchart id="chartTotal" :options="optionTotal" :series="newSeriesTotal"></apexchart>
            </q-card-section>
          </q-card>  
        </div>

        <div class="col-xs-12 col-md-6 col-lg-4 col-xl-4">
          <q-card>
            <q-card-section class="q-pa-none q-ma-none">
              <login-stat :optionsChart="optionsChart"></login-stat>
            </q-card-section>
          </q-card>
        </div>
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
          curve: 'smooth'
        },
        fill: {
          opacity: 1,
        },
        yaxis: {
          min: 0,
          labels: {
            show: false,
            minWidth: 40,
          }
        },
        title: {
          text: 0,
          offsetX: 10,
          offsetY: 20,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          offsetX: 12,
          offsetY: 10,
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
    ...mapActions('store', ['firebaseGetEnvs', 'apiGetErrors', 'updateEnvsStatus', 'apiGetLogins']),
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
        const newNumnerTitle = {
          ...this.optionsChart.title,
          text: this.newSeriesNumber[0].data.reduce((sum, x) => sum + x.y, 0)
        }
        return {
          ...this.optionsChart, 
          title: newNumnerTitle
        }
    },
    optionTotal: function() 
      {
         const newTotalTitle = {
          ...this.optionsChart.title,
          text: Intl.NumberFormat('en', { notation: 'compact' }).format(this.newSeriesTotal[0].data.reduce((sum, x) => sum + x.y, 0))
        }
        return {
          ...this.optionsChart, 
          title: newTotalTitle
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
    //this.loading = true
    this.$q.loading.show()
    this.intervalObj = setInterval(() => { this.updateEnvsStatus() }, 20000)
    await this.firebaseGetEnvs()
      .then(() => this.apiGetErrors())
      .then(() => this.apiLoadStats())
      .then(() => this.$q.loading.hide() )
    
    
  },
  beforeDestroy() {
    clearInterval(this.intervalObj)
  },
  components: {
    MiniCard: () => import('components/MiniCard'),
    LoginStat: () => import('components/LoginStats'),
    apexchart: VueApexCharts,
  }
}
</script>
