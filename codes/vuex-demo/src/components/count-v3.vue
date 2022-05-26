<template>
    <div>
        {{count}}
    </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()
const count = computed(()=>store.state.count)


</script>

