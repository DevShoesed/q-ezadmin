<template>
  <q-card 
    v-ripple
    class="q-mb-md rounded-lg bg-white"
    >
    <q-card-section class="text-center">
        <q-icon :name="icon" size="md" :color="color" />
        <p class="text-subtitle2 text-secondary q-mt-md q-mb-md">{{ name }}</p>
        <p class="text-primary text-24 q-m-none">{{ value }}</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'MiniCard',
  props: {
    value: {
      type: Number
    },
    name: {
      type: String
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    },
    color: {
        type: String
    }
  }
}
</script>

<style lang="stylus">
.text-24
  font-size: 24px;  
</style>