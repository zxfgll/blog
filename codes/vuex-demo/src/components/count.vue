<template>
    <div>
        {{ double }}
        {{ count }}
        <button @click="add">add</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    mounted() {
        console.log(this.$store);
    },
    computed:{
        localCount :()=> 1,
        ...mapState(['count' , 'double'])
    },
    // computed: mapState(['count']),
    // computed: mapState({
    //     count : state =>state.count ,
    //     double (state){
    //         return state.count * 2
    //     }
    // }),
    // computed: {
    //     count() {
    //         return this.$store.state.count // 挂载依赖，会更新
    //     }
    // },
    // data(){
    //     return {
    //         count : this.$store.state.count // 不会更新
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
