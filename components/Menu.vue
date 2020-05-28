<template>
                <div style="padding-left:10px;height:1000px;margin-right:10px">
                    <div class="box-category">
                        <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray;margin-bottom:15px"><span class='el-icon-position' /> Categories</p> 
                        <li><nuxt-link to="/category/kalung"> Kalung</nuxt-link></li>
                        <li><nuxt-link to="/category/gelang"> Gelang</nuxt-link></li>
                        <li><nuxt-link to="/category/diy"> DIY</nuxt-link></li>
                        <li><nuxt-link to="/category/perlengkapan"> Perlengkapan</nuxt-link></li>
                        <li><nuxt-link to="/category/aksesori"> Aksesori</nuxt-link></li>
                        <li><nuxt-link to="/category/souvenir"> Souvenir & Pesta</nuxt-link></li>
                        <li><nuxt-link to="/category"> Semuanya</nuxt-link></li>
                    </div>
                    <div class="box-cart">
                        <p class="head-item-type"  style="height:25px;border-bottom:1px solid lightgray" ><span class='el-icon-position' /> My Cart</p>
                        <p>You have [{{item_cart_count}}] in your shopping cart</p>
                    </div>
                    <div class="box-comp">
                        <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray"><span class='el-icon-position' /> Compare Products</p>
                        <p>You have no items to compare</p>
                    </div>
                    <div class="box-promo-side">
                        <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray"><span class='el-icon-position' /> Promotion</p>
                        <p>This period promo</p>
                    </div>
                    <div class="box-promo-side">
                        <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray"><span class='el-icon-position' /> Latest Products</p>
                        <div class="item-side" v-for="item in items" :key="item">
                          <el-row>
                            <el-col>
                          <img v-bind:src="'http://demo.maxonerp.com/tmp/'+item.icon_file" 
                            width="40px" height='40px' style="float:left;margin-right:5px"/>
                          <div class="item-side-content">
                              <p class="title">{{item.item_name}}</p>
                              <p class="price">Rp. {{item.item_price}}</p>
                          </div>
                            </el-col>
                          </el-row>
                          <el-row>                           
                            <p><nuxt-link :to="'/item/view/'+item.item_no">Add To Cart</nuxt-link></p>
                          </el-row>
                        </div>
                        <p>{{message}}</p>
                        <p><nuxt-link to="/category/all">Show All</nuxt-link></p>
                    </div>

                </div>
</template>
<script>
import axios from 'axios'
import cookie from "vue-cookie"

  export default {
    data() {
      return {
        message:'',
        item_cart_count:0,
        item_cart_amount:0,
        items:null,

      };
    },
    mounted: function(){
      this.item_cart_count=cookie.get("order_item_count",0)
      this.item_cart_amount=cookie.get("order_item_amount",0)
      this.loadItemsLatest()
    },
    methods: {
      loadItemsLatest(){
        var vUrl='/api/inventory/browse_data/?sid_latest=true';
        this.message="Execute...please wait!"
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
                this.items=data
                this.message=""
            })
            .catch((err) => {
                this.$toast.show(err);
            })
       }
    },
    
  }
</script>
<style>
.box-category {
    margin-bottom:15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
    margin-top:15px;
}
.box-category li {
    height: 25px;
}

.head-item-type {
  font-size:14px;
  font-weight:900;
}
.box-cart {
  margin-bottom:15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
}
.box-comp {
  margin-bottom:15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
}
.box-promo-side {
  margin-bottom:15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
}
.item-side {
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
}
</style>