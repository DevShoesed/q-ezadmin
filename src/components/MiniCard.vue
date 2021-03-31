<template>

  <q-card 
    v-ripple
    class="rounded-xl shadow-3 bg-white q-ma-sm"
    >
    <q-card-section class="row" >
        <q-icon :name="icon" size="4rem" :color="color" class="col-4 text-left light-dimmed" />
        <div class="col-8 q-pl-lg">
          <p class="text-10 text-secondary q-mt-xs q-mb-none">{{ name }}</p>
          <p class="text-secondary text-24 q-mb-xs">{{ value }}</p>
        </div>
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
    valuePrev: {
      type: Number,
      default: null
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
  },
  computed: {
    diffPerc: function() {
      return (this.valuePrev ? (this.value - this.valuePrev) / this.valuePrev : 1) * 100
    }
  }
}
</script>

<style lang="stylus">
.text-24
  font-size: 24px;  

.text-10
  font-size: 10px;  
</style>