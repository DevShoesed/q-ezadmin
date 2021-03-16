<template>
  <div>
    <q-separator color="primary" inset />
    <q-item
      clickable 
    >
      <q-item-section>
        <q-item-label>{{ error.Contesto }}</q-item-label>
        <q-item-label caption lines="2"> {{ error.Testo }}</q-item-label> 
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ error.DataLog }}</q-item-label>
        
        <q-badge color="red">
          Error <q-icon name="error_outline" color="white" class="q-ml-xs" />
        </q-badge>

      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { timeFromNow } from "src/boot/time";


export default {
  props: {
    error: Object
  },
  methods: {
    getTime(time) {
      const tfn = timeFromNow(time)
      return `${tfn.time} ${tfn.unitOfTime} ago`
    }
  }
}
</script>
