
<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
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
          round 
          icon="logout" 
          @click="logoutUser" 
          :label="userDetails.name" 
        />

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      left: false
    }
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  },
  computed: {
    ...mapState('store', ['userDetails']),
  }
}
</script>