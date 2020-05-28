<template>
        <el-container>
      <el-col >
        <el-row id='box-top1' >
          <el-col :span='8'>
            <span class='el-icon-phone-outline' style='font-size:20px'></span> Phone: 087874006900
            <span class='el-icon-shopping-cart-2' style='font-size:20px;margin-left:20px'></span> ({{item_cart_count}} item) - Rp. {{item_cart_amount}}            
          </el-col>
          <el-col :span='15' align="right">
            <nuxt-link to="/help"><span class='el-icon-help' style='font-size:20px'></span> Bantuan </nuxt-link>
            <nuxt-link v-if="isLoggedIn=='false' || isLoggedIn=='' || isLoggedIn==null" to="/login"><span class='el-icon-user' style='font-size:20px;margin-left:15px'></span> Log In </nuxt-link>
            <nuxt-link v-if="isLoggedIn=='true'" to="/login/logout">
                <span class='el-icon-user' style='font-size:20px;margin-left:15px'></span>
                 Log Out {{username}} 
            </nuxt-link>
          </el-col>
        </el-row>
        <el-header style="height:80px">
          <div >
            <el-col :sm="1">
            </el-col>
            <el-col :span="24" style="padding:5px">
              <nuxt-link to="/">
              <el-col :span="5" class="button2" style="margin-right:15px">                                
                  <span class='el-icon-goods' style='font-size:40px;float:left'/> 
                <div>
                  <p style='font-size:24px'>Toko MyPos</p>
                  <p style='font-size:10px'>"Online Shop Anda"</p>
                </div>
              </el-col>
              </nuxt-link>

              <el-col :span="17">
                <el-row>
                  <el-col >
                    <el-input placeholder="Ketik nama produk untuk cari" size="mini" style="width:80%" />
                    <nuxt-link to="/cart">
                      <span class='el-icon-shopping-cart-2' style='font-size:30px;;margin-left:15px' />                                      
                    </nuxt-link>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='8' class="button1" style='margin-top:9px'>                    
                    <nuxt-link to="/"><span class="el-icon-school" style='font-size:20px'/> Back Home</nuxt-link>
                    <nuxt-link to="/freeshiping"><span class='el-icon-bicycle' style='font-size:20px;margin-left:15px'/> Free Shiping</nuxt-link>
                  </el-col>
                  <el-col :span='15' class="button1" align="right" style='margin-top:9px'>
                    <nuxt-link to="/privacy"><span class='el-icon-connection' style='font-size:20px' /> Privacy Policy</nuxt-link>
                    <nuxt-link to="/cs"><span class='el-icon-service' style='font-size:20px;margin-left:15px'/> Customer Service</nuxt-link>
                  </el-col>
                </el-row>
              </el-col>
            </el-col>
          </div>           
        </el-header>
        <el-row>
        </el-row>
        <el-row>
            <el-col :span="4" :xs="6" >
                <sidebar/>
            </el-col>
            <el-col :span="20" :xs="17">
              <nuxt />
            </el-col>
        </el-row>
      </el-col>
    </el-container>

</template>

<script>
import menu from '~/components/Menu'
import cookie from 'vue-cookie'

  export default {
    components: {
        'sidebar':menu
    },
    data() {
      return {
          item_cart_count:0,
          item_cart_amount:0,
          isLoggedIn: false,
          username:''
      };
    },
    mounted: function(){
      this.item_cart_count=cookie.get("order_item_count",0)
      this.item_cart_amount=cookie.get("order_item_amount",0)
      this.isLoggedIn=cookie.get("logged_in")
      var user=cookie.get("user_info")
      console.log(user)
      this.username=cookie.get("username")
    },
    methods: {

    }
  }
</script>

<style >
.button1 img {
    width:25px;height:20px;float:left;
    margin-right:10px
}
.button2 img {
    width:50px;height:50px;float:left;margin-right:10px
}
a {
    text-decoration:none;
}
#box-top1 {
    color: white;
    background: #b603c1;
    text-align: center;
    padding-bottom: 5px;
    padding-top: 10px;
    font-weight: 900;
}
#box-top1 a {
    color: white;
}
.el-header a {
    color: white;
}
</style>