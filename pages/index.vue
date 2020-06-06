<template>
    <el-main>
      <el-row>
        <el-col :span="24" >
          <span  v-loading="loading"  />
          <i style='color:red;height:50px'><b>{{message}} </b></i>
        </el-col>
      </el-row>
      <el-row> 
          <el-col :span="24" :xs=0 >
            <myslider/>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span=24>
          <el-col :span=14 >
            <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
                <span class='el-icon-position' /> Category Pilihan
            </el-col>
            <el-card style="padding-bottom:10px">
              <categoryPilihan />
            </el-card>
          </el-col>
          <el-col :span=10>
          <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
              <span class='el-icon-position' /> TopUp & Pulsa
          </el-col>
            <pulsaHp />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' /> Latest Products
        </el-col>
        <item-latest />
      </el-row>
      
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' /> Promotion
        </el-col>
        <el-col style="height:300px;">   
          <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/promo1.jpg'" width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/promo2.jpg'" width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/promo3.jpg'" width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img v-bind:src="siteUrl+'tmp/promo4.jpg'" width="100%" height="180"/>
              </el-carousel-item>
            </el-carousel>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' /> Featured Products
        </el-col>
        <item-features />
      </el-row>
    </el-main>
</template>

<script>
import cookie from 'vue-cookie'
import myslider from '~/components/Slider'
import itemFeatures from '~/components/ItemFeatures'
import itemLatest from '~/components/ItemLatest'
import pulsaHp from '~/components/PulsaHp'
import categoryPilihan from '~/components/CategoryPilihan'
export default {
    head: {
      title: 'Toko MyPOS',
        meta: [
          {  hid: 'og:type', name: 'og:type', content: "article" },
          {  hid: 'og:title', name: 'og:title', content: "Toko MyPos Online Shop" },
          {  hid: 'og:image', name: 'og:image', content: "http://demo.maxonerp.com/tmp/tokomypos/imgfb.jpg"},
          {  hid: 'og:url', name: 'og:url', content: "http://tokomypos.biz.id/"},
          { hid: 'og:alt', name: 'og:alt', content: "Toko MyPos Online Shop"},
          { hid: 'og:description', name: 'og:description', content: "Toko MyPos menyediakan segala kebutuhan anda untuk perhiasan, cendramata, alat kesehatan. Segera kunjungi kami untuk mendapatkan diskon yang menarik dan harga yang murah."},
        ],
    },
    components: { 
      pulsaHp, categoryPilihan,
      myslider, 
      'item-features':itemFeatures,
      'item-latest':itemLatest,
    },
    data() {
      return {
        siteUrl2:'',
        message_next:"",
        message:'',
        upHere:false,
        loading: false
      }
    },
    methods: {
    },
    mounted() {
      cookie.set('siteUrl2',this.siteUrl2)
    },

    updated: function () {

    },
    created: function () {

    },
    computed: {
       baseUrl() {
         return process.env.baseUrl
       },
       siteUrl() { 
          this.siteUrl2=process.env.siteUrl; 
          return process.env.siteUrl
       }      
    },
    complete() {
      this.loading=false
    }
  };
</script>
<style>
.text-head {
  font-size: x-large;
}
.box-card {
  margin-right:15px;
  margin-bottom:15px;
  height:100px;
}
.head-item-type {
  color:rebeccapurple;
  font-weight: 900;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>