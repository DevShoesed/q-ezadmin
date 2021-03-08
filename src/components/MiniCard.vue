<template>
  <q-card 
    v-ripple:primary 
    bordered
    class="mini-card q-pa-md rounded-lg bg-secondary"
    >
    <q-card-section>
        <div class="row">
            <div class="col">
                <div class="text-h5 text-uppercase text-blue-grey-4 q-mb-none">{{ name }}</div>
                <span class="text-h4 text-weight-bold q-mb-none">
                    {{ value }}
                </span>
            </div>
            <div class="col-auto">
                <q-icon :name="icon" size="md" :color="color" />
            </div>
        </div>
    </q-card-section>
    <q-card-actions v-if="description != '' ">
        <span>{{ description }}</span>
    </q-card-actions>
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
.mini-card
  cursor pointer
</style>