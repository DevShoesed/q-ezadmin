<template>
    <q-page class="container bg-grey-2 q-pa-lg">
        <h5 class="text-primary q-mt-none q-mb-xs">Environments List</h5>
        
        <q-list
            class="rounded-lg"
        >
            <env-item 
                v-for="(env, index) in envs" 
                :key="index"
                :env="env"
            />

        </q-list>

    </q-page>
</template>

<script>

import { mapState } from  'vuex'

export default {
    computed: {
        ...mapState('store', ['envs'])
    },
    components: {
        EnvItem: () => import('components/EnvItem')
    }
}
</script>