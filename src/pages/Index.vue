<template>
  <q-page class="container bg-grey-2">
    <div class="q-pa-sm row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-lg-3">
        <mini-card
            :value="numberEnvs"
            name="Environments"
            icon="apps"
            color="blue-grey-4"
          />
      </div>
    </div>
    
  </q-page>
</template>

<script>
import  { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  methods: {
    ...mapActions('store', ['firebaseGetEnvs'])
  },
  computed: {
    ...mapGetters('store', ['numberEnvs'])
  },
  beforeMount() {
    this.firebaseGetEnvs()
  },
  components: {
    MiniCard: () => import('components/MiniCard')
  }
}
</script>


