<template>
    <div>
        {{ count }}
        <button @click="increment({ num: 2 })">add</button>
        <button v-if="!ready" @click="getImage">get image</button>
        <img v-else :src="imgUrl" alt="" style="width: 100px;">
    </div>
</template>

<script>
import { mapMutations, mapActions, createNamespacedHelpers } from 'vuex'
const url = 'https://api.waifu.im/random'

const { mapState } = createNamespacedHelpers('imgModule')

export default {
    data() {
        return {
            ready: false,
        }
    },
    computed: {
        ...mapState({
            imgUrl: state => state.imgUrl
        })
        // ...mapState('imgModule', {
        //     imgUrl: state => state.imgUrl
        // })
    },
    methods: {
        add() {
            // this.$store.dispatch('increment' , {num : 2})
            this.$store.dispatch({
                type: 'increment',
                num: 2
            })
        },
        getImage() {
            this.$store.dispatch('getImage', { url }).then(() => {
                this.$data.ready = true
            })
        },
        ...mapActions(['increment'])
    }
}
</script>
