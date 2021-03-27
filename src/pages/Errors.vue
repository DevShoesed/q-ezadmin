<template>
  <q-page class="container bg-grey-2 q-pa-lg">
    
    <h4 class="text-primary q-mb-xs">Error List</h4>
    
    <div class="bg-white rounded-borders shadow-1">
      
      <q-list
        padding
        v-if="allErrors.length > 0"
      >
        <error-item 
          v-for="(err, index) in allErrors"
          :key="index"
          :error="err"
        />
      </q-list>
      <div 
        class="text-caption text-center text-bold q-pa-lg"
        v-else
      >
        No errors
      </div>

    </div>
    
     <!-- <q-dialog
      v-model="dialogPayload"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ dialog.title }}</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh" class="q-pt-none scroll">
          <pre>{{ dialog.payload }}</pre>
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script>
import { mapGetters } from  'vuex'

export default {
  data() {
    return {
      dialogPayload: false,
      dialog: {
        title: '',
        payload: ''
      },
      pagination: {
        rowsPerPage: 0
      },
      coloumns: [
        { name: 'sev', field: row => row.sev, format: val => `${val.charAt(0)}` },
        { name: 'environment', field: row => row.environment, align: 'left' },
        { name: 'time', field: row => row.time, align: 'left' },
        { name: 'subject', field: row => row.contesto, align: 'left' },
        { name: 'message', field: row => row.message, align: 'left' }
      ]
    }
  },
  methods: {
    showPayload(row) {
      this.dialog.title = row.environment;
      this.dialog.payload = JSON.parse(row.payload) ? JSON.stringify(JSON.parse(row.payload), null, '\t') : row.payload;
      this.dialogPayload = true;
    }
  },
  computed: {
    ...mapGetters('store', ['allErrors'])
  },
  components: {
   ErrorItem: () => import('components/ErrorItem')
  }
}
</script>
