<template>
  <div>
    <q-item
      clickable
      v-ripple
      class="bg-white q-ma-xs"
    >
      <q-item-section avatar >
        <q-avatar color="red" text-color="white" size="xl" icon="error_outline" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1"><span class="text-bold text-primary">{{ error.environment }}</span> - {{ error.contesto }}</q-item-label>
        <q-item-label caption> {{ error.message }}</q-item-label>
      </q-item-section>
      
      <q-item-section side >
        <q-item-label caption>{{ error.time }}</q-item-label>
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
