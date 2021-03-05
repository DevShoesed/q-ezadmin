<template>
  <q-page 
    class="bg-primary window-height window-width row justify-center items-center"
    >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">EZConn ADMIN</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="formData.email" type="email" label="email" />
              <q-input square filled clearable v-model="formData.password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" @click="submitForm" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('store', ['loginUser']),
    submitForm() {
      this.loginUser(this.formData)
    }
  }
}
</script>


<style lang="stylus">
  .q-card
    width 360px
</style>