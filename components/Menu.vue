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
          <li><nuxt-link to="/category/apd"> Apd (Medical)</nuxt-link></li>
          <li><nuxt-link to="/category"> Semuanya</nuxt-link></li>
      </div>
      <div class="box-cart">
          <p class="head-item-type"  style="height:25px;border-bottom:1px solid lightgray" ><span class='el-icon-position' /> My Profile</p>
          <li><nuxt-link to="/profile"> Profile</nuxt-link></li>
          <li><nuxt-link to="/cart"> Kantong Belanja</nuxt-link></li>
          <li><nuxt-link to="/so/order"> History Order</nuxt-link></li>
          <li><nuxt-link to="/help"> Bantuan</nuxt-link>
          <li><nuxt-link to="/login/signup"> Pendaftaran</nuxt-link>
          <li><nuxt-link to="/login/logout"> Logout</nuxt-link></li>

          <p>You have [{{$store.state.itemCartCount}}] in your shopping cart</p>

      </div>
      <div class="box-comp">
          <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray">
            <span class='el-icon-position' /> Compare</p>
          <p>You have no items to compare</p>
      </div>
      <div class="box-promo-side">
          <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray"><span class='el-icon-position' /> Promotion</p>
          <p>This period promo</p>
      </div>
      <div class="box-promo-side">
      </div>

  </div>
</template>
<script>
import cookie from "vue-cookie"

  export default {
    data() {
      return {
        message:'',
        item_cart_count:0,
        item_cart_amount:0
      };
    },
    mounted: function(){
      this.item_cart_count=cookie.get("order_item_count",0)
      this.item_cart_amount=cookie.get("order_item_amount",0)

    },
    methods: {
    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl}      
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
.box-category a {
    font-weight: bold;
    text-decoration: none;
}
.box-category a:hover {
  color:blueviolet;
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
.box-cart li {
  height: 25px;
  padding-top: 5px
}
.box-cart a {
    font-weight: bold;
    text-decoration: none;
}
.box-cart a:hover {
    color:blueviolet
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