<template>
    <div>
        <el-carousel indicator-position="inside" style="height:300px;text-align:center;">
            <el-carousel-item>
                <img :src="siteUrl+'tmp/'+slider1" width="100%" height="270"/>
            </el-carousel-item>
            <el-carousel-item>
                <img v-bind:src="siteUrl+'tmp/'+slider2" width="100%" height="270"/>
            </el-carousel-item>
            <el-carousel-item>
                <img v-bind:src="siteUrl+'tmp/'+slider3" width="100%" height="270"/>
            </el-carousel-item>
            <el-carousel-item>
                <img v-bind:src="siteUrl+'tmp/'+slider4" width="100%" height="270"/>
            </el-carousel-item>
        </el-carousel>

    </div>
</template>
<script>
export default {
    data(){
        return {
            slider1:'slider1.jpg',
            slider2:'slider2.jpg',
            slider3:'slider3.jpg',
            slider4:'slider4.jpg'
        }
    },
    methods: {
        loadData(){
            var vUrl='/api/media/sliderPromo'
            this.$axios.get(vUrl)
            .then((Response) => {         
                var d=Response.data
                  if(d.slider1!='')  this.slider1=d.slider1
                  if(d.slider2!='')  this.slider2=d.slider2
                  if(d.slider3!='')  this.slider3=d.slider3
                  if(d.slider4!='')  this.slider4=d.slider4
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