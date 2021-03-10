<template>
  <q-page class="container bg-grey-2">
    <div class="bg-primary">
      <div class="q-pa-sm doc-container">
        <div class="column items-end">
          <q-btn 
            icon="event" 
            no-caps
            outline 
            color="accent">
            From {{ displayDate(dateRange.from) }} to {{ displayDate(dateRange.to) }}
            <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
              <q-date 
                range
                v-model="proxyDateRange" 
                mask="YYYY-MM-DD" 
              >
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" @click="saveProxy" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
      <div class="q-pa-sm row q-col-gutter-sm">
        <div class="col-xs-12 col-sm-6 col-lg-3">
          <mini-card
              v-if="!loading"
              :value="numberEnvs"
              name="Environments"
              icon="apps"
              color="blue-grey-4"
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
              color="blue-grey-4"
            />
            <q-skeleton 
              v-else 
              width="200px" 
              height="100px" 
            />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import  { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      loading: false,
      calendar: false,
      proxyDateRange: this.dateRange
    }
  },
  methods: {
    ...mapActions('store', ['firebaseGetEnvs', 'apiGetErrors', 'setDateRange']),
    updateProxy() {
      this.proxyDateRange = this.dateRange
    },
    saveProxy() {
      this.setDateRange(this.proxyDateRange)
    },
    displayDate(givenDate) {
      return date.formatDate(givenDate, 'DD MMM YY')
    }
  },
  computed: {
    ...mapGetters('store', ['numberEnvs', 'dateRange', 'numErrors'])
  },
  async mounted() {
    this.loading = true
    await this.firebaseGetEnvs()
      .then(() => this.apiGetErrors())
    this.loading = false
  },
  components: {
    MiniCard: () => import('components/MiniCard')
  }
}
</script>


