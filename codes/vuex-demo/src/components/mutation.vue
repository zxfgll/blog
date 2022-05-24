<template>
    <div>
        {{ count }}
        <button @click="add">add</button>
    </div>
</template>

<script>
import { mapState ,mapMutations } from 'vuex'
export default {
    computed:{
        ...mapState(['count'])
    },
    methods: {
        ...mapMutations({
            add : 'increment'
        })
        // ...mapMutations(['increment']),
        // add() {
        //     this.$store.commit({
        //             type :'increment' ,
        //             num: 2,
        //         })
        // },
        // add() {
        //     this.$store.commit('increment' , 2)
        // },
    }
}
</script>
