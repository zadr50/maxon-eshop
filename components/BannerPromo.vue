<template>
    <div>
        <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/'+promo1" width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/'+promo1" width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/'+promo3" width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/'+promo4" width="100%" height="180"/>
              </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
    data(){
        return {
            promo1:'promo1.jpg',
            promo2:'promo2.jpg',
            promo3:'promo3.jpg',
            promo4:'promo4.jpg',

        }
    },
    methods: {
        loadData(){
            var vUrl='/api/media/sliderPromo'
            this.$axios.get(vUrl)
            .then((Response) => {         
                var d=Response.data
                if(d.promo!=null){
                    this.promo1=d.promo1
                    this.promo2=d.promo2
                    this.promo3=d.promo3
                    this.promo4=d.promo4

                }
            })
            .catch((err) => {
                console.log(err)
            })               
        }
    },
    mounted: function(){
        this.loadData()
    },
    computed: {
       siteUrl() { return process.env.siteUrl}      
    },

}
</script>