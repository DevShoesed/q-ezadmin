<template>
  <q-page class="container bg-grey-2 q-pa-lg">
    <div class="bg-white">
      <div class="text-h4 text-uppercase text-center text-primary">Errors</div>

      <q-separator />

      <q-list
        padding
      >
        <error-item 
          v-for="(err, index) in allErrors"
          :key="index"
          :error="err"
        />
      </q-list>
    </div>
    
    <!-- <q-table
      style="height: 400px"
      title="Errors"
      :data="allErrors"
      :columns="coloumns"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
            <q-td key="sev" :props="props">
              <q-badge color="negtive" :label="props.row.sev.charAt(0)" />
            </q-td>
            <q-td key="environment" class="text-bold" align="left">
              {{ props.row.environment }}
            </q-td>
            <q-td key="time" align="left">
              {{ props.row.time }}
            </q-td>
            <q-td key="subject" class="text-uppercase" align="left">
              {{ props.row.contesto }}
            </q-td>
            <q-td key="message" class="text-caption" align="left">
              {{ props.row.message }}
            </q-td>
            <q-td key="payload">
              <q-btn
                v-if="props.row.payload != ''" 
                size="sm"
                icon="code" 
                color="primary" 
                @click="showPayload(props.row)" 
              />
            </q-td>
        </q-tr>
      </template>
    </q-table> -->

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
