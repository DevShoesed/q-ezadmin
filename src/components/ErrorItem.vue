<template>
  <div>
    <q-item
      clickable
      v-ripple
    >
      <q-item-section avatar top >
        <q-icon name="error_outline" color="negative" size="md" class="q-ml-md" />
      </q-item-section>

      <q-item-section>
        <q-item-label><span class="text-bold text-primary">{{ error.environment }}</span> - {{ error.contesto }}</q-item-label>
        <q-item-label caption lines="4"> {{ error.message }}</q-item-label> 
      </q-item-section>
      
      <q-item-section side top>
        <q-item-label caption>{{ error.time }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator color="accent" inset />

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
