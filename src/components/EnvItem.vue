<template>
  <q-item>
    <q-item-section avatar top>
      <q-icon name="apps" color="primary" size="34px" />
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
        <a 
          :href="env.apiUrl" 
          target="_blank"
        >Open in Browser</a>
      </q-item-label>
    </q-item-section>

    <!-- Add on this botton emit of custom even or props callback -->
    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
        <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
        <q-btn size="12px" flat dense round icon="more_vert" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    env: Object
  }
}
</script>
