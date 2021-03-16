<template>
    <q-page class="container bg-grey-2">
        
        <q-list
            bordered
            class="rounded-borders"
        >
            <q-item-label header>Environments List</q-item-label>

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