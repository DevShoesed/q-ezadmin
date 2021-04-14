<template>
  <apexchart 
    v-if="loginSeries" 
    :height="optionsChart.chart.height" 
    id="chartLogins" 
    :options="loginsChartOption" 
    :series="loginSeries" 
    :type="optionsChart.type" 
  ></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    optionsChart: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('store', ['apiGetLogins']),
  },
  created () {
    this.apiGetLogins()
    setTimeout(() => {
      
    }, 3000);
  },
  watch: {
    envs: function() {
      this.apiGetLogins();
    }
  },
  computed: {
    ...mapGetters('store', ['envs', 'loginsByDate']),
    loginSeries: function() {
      let series=[];
      this.loginsByDate.forEach((value, key) => {
        series.push({
          x: key,
          y: value.length
        })
      })
      return [
        {
          name: "Logins",
          data: series
        }
      ];
    },
    loginsChartOption: function() {
      const newLoginsTitle = {
        ...this.optionsChart.title,
        text: this.loginSeries[0].data.reduce((sum, x) => sum + x.y, 0)
      }
      return {
          ...this.optionsChart, 
          title: newLoginsTitle
        }
    }
  },
  components: {
    apexchart: VueApexCharts,
  }
}
</script>
