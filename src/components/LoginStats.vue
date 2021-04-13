<template>
  <apexchart id="chartLogins" :options="optionsChart" :series="loginSeries" :type="optionsChart.type" ></apexchart>
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
    
    }
  },
  components: {
    apexchart: VueApexCharts,
  }
}
</script>
