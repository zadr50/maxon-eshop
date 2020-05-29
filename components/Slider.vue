<template>
    <div>
        <el-carousel indicator-position="inside" style="height:300px;text-align:center;">
            <el-carousel-item>
                <img :src="siteUrl+'tmp/slider1.jpg'" width="100%" height="270"/>
            </el-carousel-item>
            <el-carousel-item>
                <img v-bind:src="siteUrl+'tmp/slider2.jpg'" width="100%" height="270"/>
            </el-carousel-item>
            <el-carousel-item>
                <img v-bind:src="siteUrl+'tmp/slider3.jpg'" width="100%" height="270"/>
            </el-carousel-item>
            <el-carousel-item>
                <img v-bind:src="siteUrl+'tmp/slider4.jpg'" width="100%" height="270"/>
            </el-carousel-item>
        </el-carousel>

    </div>
</template>
<script>
export default {
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl}      
    },

}
</script>