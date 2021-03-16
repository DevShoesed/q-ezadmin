<template>
  <q-page class="container bg-grey-2">
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
      loading: false
    }
  },
  methods: {
    ...mapActions('store', ['firebaseGetEnvs', 'apiGetErrors'])
  },
  computed: {
    ...mapGetters('store', ['numberEnvs', 'numErrors'])
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


