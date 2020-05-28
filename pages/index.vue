<template>
    <el-main>
      <el-row>
        <el-col :span="24" >
          <i style='color:red'>Message: {{message}}</i>
        </el-col>
      </el-row>
      <el-row>        
          <el-col :span="24">
                <el-carousel indicator-position="inside" style="height:300px;text-align:center;">
                  <el-carousel-item>
                    <img src='~/assets/slider1.jpg' width="100%" height="270"/>
                  </el-carousel-item>
                  <el-carousel-item>
                    <img src='~/assets/slider2.jpg' width="100%" height="270"/>
                  </el-carousel-item>
                  <el-carousel-item>
                    <img src='~/assets/slider3.jpg' width="100%" height="270"/>
                  </el-carousel-item>
                  <el-carousel-item>
                    <img src='~/assets/slider4.jpg' width="100%" height="270"/>
                  </el-carousel-item>
                </el-carousel>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' /> Latest Products
        </el-col>
        <el-col :span="24" >
            <el-col v-for="item in items_latest" :key="item" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card class="box-item" >
                  <div class="divItem" >
                    <div class='foto' style="text-align:center;cursor:pointer; " @click="boxItemClick(item.item_no)" >
                    <img v-bind:src="'http://demo.maxonerp.com/tmp/'+item.icon_file" width="200" height="170"  />                                   
                    </div>
                    <div class='item_name'>
                      <p>{{item.item_name}}</p>  
                    </div>
                    <div class="item_foot">
                        <div class="sku">
                          <p>{{item.item_no}}</p>
                        </div>
                        <div class="price">
                          <p>{{item.item_price}}</p>
                        </div>
                    </div>
                  </div>
                  
              </el-card>
            </el-col>            
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' /> Promotion
        </el-col>
        <el-col style="height:300px;">   
          <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item>
                    <img src='~/assets/promo1.jpg' width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img src='~/assets/promo2.jpg' width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img src='~/assets/promo3.jpg' width="100%" height="180"/>
              </el-carousel-item>
              <el-carousel-item>
                    <img src='~/assets/promo4.jpg' width="100%" height="180"/>
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
              <el-card class="box-item">
                 <div class='foto' style="text-align:center">
                    <img v-bind:src="'http://demo.maxonerp.com/tmp/'+item.icon_file" width="200" height="170"  />                                   
                 </div>
                 <div class='item_name'>
                   <p>{{item.item_name}}</p>  
                 </div>
                 <div class="item_foot">
                    <div class="sku">
                      <p>{{item.item_no}}</p>
                    </div>
                    <div class="price">
                      <p>{{item.item_price}}</p>
                    </div>
                 </div>
              </el-card>
            </el-col>            
        </el-col>
      </el-row>
      
    </el-main>
</template>

<script>
import axios from 'axios'
import cookie from 'vue-cookie'

export default {
    head: {
      title: 'MaxonErp Online Shop'
    },
    components: {
    },
    data() {
      return {
        message:'',
        upHere:false,
        items_latest: null,
        items_features:null,
      }
    },
    methods: {
       boxItemClick(item_no){
         window.open("item/view/"+item_no,"_self");
       },
       getProductImage(img) {
          let defaultImage = "no_image.png" // just set default
          try {
            require(`../assets/${img}`);
            return img;
          } catch (e) {
            this.$toast.show(e)
            return defaultImage
          }
      },
       loadItemLatest(){
        var vUrl='/api/inventory/browse_data/?supplier=beads';
        this.$toast.show("Execute...please wait!");
        axios.get(vUrl)
            .then((Response) => {
                var o = Response.data.rows;
                var data=[];
                for(var i=0;i<o.length;i++){
                  data.push(
                     {item_no:o[i].item_number,item_name:o[i].description,
                     item_price:o[i].retail,icon_file: o[i].item_picture}
                  )
                }
                this.items_latest=data

                //this.$refs.pagination.total=Response.data.rows.length/10
                this.$toast.clear();
            })
            .catch((err) => {
                this.$toast.show(err);
            })
       },
       loadItemFeatures(){
        var vUrl='/api/inventory/browse_data/?stat=features';
        axios.get(vUrl)
            .then((Response) => {
                var o = Response.data.rows;
                var data=[];
                for(var i=0;i<o.length;i++){
                  data.push(
                     {item_no:o[i].item_number,item_name:o[i].description,
                     item_price:o[i].retail,icon_file: o[i].item_picture}
                  )
                }
                this.items_features=data
            })
            .catch((err) => {
                this.$toast.show(err);
            })

       }
    },
    mounted() {
      this.loadItemLatest()
      this.loadItemFeatures()
    },

    updated: function () {
       
    },
    created: function () {

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
.divItem .foto :hover {
  border:1px solid gray;
}
</style>