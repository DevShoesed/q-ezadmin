
<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-grey-2 text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <q-icon 
              name="sync"
              size="xl"
              class="text-secondady"
            />
          </q-avatar>
          EZAdmin
        </q-toolbar-title>

       
        <q-btn 
          dense 
          flat 
          icon-right="logout" 
          @click="logoutUser"
          :label="userDetails.name" 
        />

      </q-toolbar>

      <q-toolbar 
        inset
        class="bg-primary"
      >
         <q-btn 
            icon="event" 
            no-caps
            outline 
            color="accent"
          >
            {{ displayDate(dateRange.from) }} - {{ displayDate(dateRange.to) }}
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
      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-list
        padding 
        class="rounded-borders text-primary"
      >
        <q-item
          clickable
          v-ripple
          to="/"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        
        <q-item
          clickable
          v-ripple 
          to='/envs'
        >
          <q-item-section avatar>
            <q-icon name="apps" />
          </q-item-section>
          <q-item-section>Environments</q-item-section>
        </q-item>


        <q-item
          clickable
          v-ripple 
          to='/errors'
        >
          <q-item-section avatar>
            <q-icon name="error_outline" />
          </q-item-section>
          <q-item-section>Errors</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { date } from 'quasar'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      left: false,
      proxyDateRange: this.dateRange
    }
  },
  methods: {
    ...mapActions('store', [ 'setDateRange', 'logoutUser']),
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
    ...mapState('store', ['userDetails']),
    ...mapGetters('store', ['dateRange'])
  }
}
</script>