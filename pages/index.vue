<template>
    <el-main>
      <el-row>
        <el-col :span="24" >
          <span  v-loading="loading"  />
          <i style='color:red;height:50px'><b>{{message}} </b></i>
        </el-col>
      </el-row>
      <el-row> 
          <el-col :span="24" >
            <myslider/>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' /> Latest Products
        </el-col>
        <el-col :span="24" v-loading="loading" >
            <el-col  v-for="item in items_latest" :key="item" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card class="box-item" >
                    <div class='foto' style="text-align:center;cursor:pointer; " 
                      @click="boxItemClick(item.item_no)" >
                    <img v-bind:src="siteUrl+'tmp/'+item.icon_file" width="100%" height="170"  />                                   
                    </div>
                    <div class='item_name'>
                      <p>{{item.item_name}}</p>  
                    </div>
                    <div class="item_foot">
                        <div class="sku">
                          <p>{{item.item_no}}</p>
                        </div>
                        <div class="price">
                          <p>Rp.{{Number(item.item_price).toLocaleString()}}</p>
                        </div>
                    </div>
              </el-card>
            </el-col>            
        </el-col>
        <el-col :span=24>
          <el-button type="primary" @click="nextPageLatest"> Halaman Selanjutnya</el-button>
          <span>{{message_next}}</span>
        </el-col>

      
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
        <el-col :span="24" >
            <el-col v-for="item in items_features" :key="item" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card class="box-item" >
                    <div class='foto' style="text-align:center;cursor:pointer; " 
                      @click="boxItemClick(item.item_no)" >
                    <img v-bind:src="siteUrl+'tmp/'+item.icon_file" width="100%" height="170"  />                                   
                    </div>
                    <div class='item_name'>
                      <p>{{item.item_name}}</p>  
                    </div>
                    <div class="item_foot">
                        <div class="sku">
                          <p>{{item.item_no}}</p>
                        </div>
                        <div class="price">
                          <p>Rp.{{Number(item.item_price).toLocaleString()}}</p>
                        </div>
                    </div>
              </el-card>
            </el-col>            
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary" @click="nextPage"> Halaman Selanjutnya</el-button>
          <span>{{message_next}}</span>
        </el-col>
      </el-row>
    </el-main>
</template>

<script>
import cookie from 'vue-cookie'
import myslider from '~/components/Slider'

export default {
    head: {
      title: 'Toko MyPOS'
    },
    components: { 
      myslider
    },
    data() {
      return {
        siteUrl2:'',
        message_next:"",
        page:1,
        page_latest:1,
        message:'',
        upHere:false,
        items_latest: null,
        items_features:null,
        loading: true
      }
    },
    methods: {
      prevPageLatest(){
        this.page_latest--
        if(this.page_latest<1)this.page_latest=1
        this.message="Page: " + this.page_latest
        this.loadItemLatest()
      },
      nextPageLatest(){
        this.page_latest++
        this.message="Page: " + this.page_latest
        this.loadItemLatest()
      },
      prevPage(){
        this.page--
        if(this.page<1)this.page=1
        this.message="Page: " + this.page
        this.loadItemFeatures()
      },
      nextPage(){
        this.page++
        this.message="Page: " + this.page
        this.loadItemFeatures()
      },
       boxItemClick(item_no){
           window.open("item/view/"+item_no,"_self");
       },
       loadItemLatest(){
        var vUrl='/api/inventory/browse_data/?supplier=beads&page=' + this.page_latest;
        this.message_next="Loading page " + this.page_latest + "..."
        this.$axios.get(vUrl)
            .then((Response) => {
                var o = Response.data.rows;
                if(this.page_latest==1){
                  var data=[];
                  for(var i=0;i<o.length;i++){
                    data.push(
                      {item_no:o[i].item_number,item_name:o[i].description,
                      item_price:o[i].retail,icon_file: o[i].item_picture}
                    )
                  }
                  this.items_latest=data
                } else {
                  for(var i=0;i<o.length;i++){
                    this.items_latest.push(
                      {item_no:o[i].item_number,item_name:o[i].description,
                      item_price:o[i].retail,icon_file: o[i].item_picture}
                    )
                  }
                }
                this.$toast.clear();
                this.loading=false
                this.message=""
            })
            .catch((err) => {
                this.$toast.show(err);
            })
       },
       loadItemFeatures(){
        this.message_next="Loading page " + this.page + "..."
        var vUrl='/api/inventory/browse_data/?stat=features&page=' + this.page;
        this.$axios.get(vUrl)
            .then((Response) => {
                var o = Response.data.rows;
                if(this.page==1){
                    var data=[];
                    for(var i=0;i<o.length;i++){
                      data.push(
                        {item_no:o[i].item_number,item_name:o[i].description,
                        item_price:o[i].retail,icon_file: o[i].item_picture}
                      )
                  }
                  this.items_features=data
                  this.message_next=""

                } else {
                  for(var i=0;i<o.length;i++){
                    this.items_features.push(
                      {item_no:o[i].item_number,item_name:o[i].description,
                      item_price:o[i].retail,icon_file: o[i].item_picture}
                    )
                  }
                  this.message_next=""
                }
            })
            .catch((err) => {
                this.$toast.show(err);
            })
       }
    },
    mounted() {
      cookie.set('siteUrl2',this.siteUrl2)
      this.loadItemLatest()
      this.loadItemFeatures()
    },

    updated: function () {

    },
    created: function () {

    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { 
          this.siteUrl2=process.env.siteUrl; 
          return process.env.siteUrl
       }      
    },
    complete() {

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
.box-item {
  margin-right:10px;
  margin-bottom:10px;
  height:280px;
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
.price {
    color: #f56c6c;
    font-size: larger;
    float: right;
}
.sku {
    float: left;
    margin-right: 10px;
}
.box-item :hover {
    background: lightgray;
}
</style>