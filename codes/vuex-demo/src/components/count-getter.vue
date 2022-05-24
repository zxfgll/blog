<template>
    <div>
        {{ double }}
        {{ fourTimes }}
        {{ getFour }}
        <button @click="add">add</button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    mounted() {
        console.log(this.$store);
    },
    computed:mapGetters(['double' , 'fourTimes' ]),
    // computed: {
    //     double() {
    //         return this.$store.getters.double
    //     },
    //     fourTimes() {
    //         return this.$store.getters.fourTimes
    //     },
    //     getFour() {
    //         return this.$store.getters.customNum(4)
    //     }
    // },
    methods: {
        add() {
            this.$store.commit('increment')
            console.log(this.$store.state.count);
        }
    }
}
</script>
