<template>
  <q-item class="bg-white q-ma-xs">
    
    <q-item-section avatar>
      <q-avatar color="secondary" class="text-white" size="xl">{{ env.name.charAt(0) }}</q-avatar>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">[{{ env.name }}]</span>
        <span class="text-grey-8"> - {{ env.description }}</span>
      </q-item-label>
      <q-item-label caption lines="1">
        {{ env.apiUrl }}
      </q-item-label>
      <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <q-btn 
          color="secondary"
          :href="env.apiUrl" 
          @click="openInBrowser(env.apiUrl)"
          label="Open in Browser"
          outline 
          icon-right="open_in_browser"
        />
      </q-item-label>
    </q-item-section>

    <!-- Add on this botton emit of custom even or props callback -->
    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn size="12px" flat dense round icon="delete" />
        <q-btn size="12px" flat dense round icon="done" />
        <!-- <q-btn size="12px" flat dense round icon="more_vert" /> -->
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { openURL } from 'quasar'

export default {
  props: {
    env: Object
  },
  methods: {
    openInBrowser: function(url) {
      openURL(url)
    }
  }
}
</script>
