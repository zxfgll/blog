import {defineStore} from 'pinia'

export const useImageStore = defineStore('image' , {
    state : ()=>({imgUrl : ""}),
    actions :{
        async getImg(url){
            const imgUrl = await fetch(url).then(res => res.json()).then(({images})=> images[0].url)
            this.imgUrl = imgUrl
            return imgUrl
        }
    },
})