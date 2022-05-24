<template>
    <div>
        {{ count }}
        <button @click="add">add</button>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$store);
    },
    // computed: {
    //     count() {
    //         return this.$store.state.count // 挂载依赖，会更新
    //     }
    // },
    data(){
        return {
            count : this.$store.state.count // 不会更新
        }
    },
    methods: {
        add() {
            this.$store.commit('increment')
            console.log(this.$store.state.count);
        }
    }
}
</script>
