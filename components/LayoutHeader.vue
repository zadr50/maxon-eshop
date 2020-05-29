<template>
  <div>
    <el-row id='box-top1' >
          <el-col :span='10' :xs=24 :sm=14>
            <el-row>
              <el-col :span=10 :xs=23 :sm=11>
                <span @click="drawer = true" class="el-icon-notebook-2" style="font-size:20px"/>  
                | <span class='el-icon-phone-outline' style='font-size:20px'></span> Phone: +62-087874006900
              </el-col>
              <el-col :span=13 :xs=23 >
                | <span class='el-icon-shopping-cart-2' style='font-size:20px;'></span> ({{item_cart_count}} item) - Rp. {{item_cart_amount}}            
              </el-col>
            </el-row>
          </el-col>
          <el-col :span='13' :xs=24 :sm=9 align="right">
            | <nuxt-link to="/help"><span class='el-icon-help' style='font-size:20px'></span> Bantuan </nuxt-link>
            | <nuxt-link v-if="isLoggedIn=='false' || isLoggedIn=='' || isLoggedIn==null" to="/login"><span class='el-icon-user' style='font-size:20px;margin-left:15px'></span> Log In </nuxt-link>
            | <nuxt-link v-if="isLoggedIn=='true'" to="/login/logout">
                <span class='el-icon-user' style='font-size:20px;margin-left:15px'></span>
                 Log Out {{username}} 
            </nuxt-link>
          </el-col>
    </el-row>
    <el-header >
          <div >
            <el-col :span="24" style="padding:5px">
              <el-col :span=10 :xs=24>
                <nuxt-link to="/">
                  <el-col class="button2" style="margin-right:15px">                                
                    <span class='el-icon-goods' style='font-size:40px;float:left'/> 
                    <div>
                      <p style='font-size:20px'>Toko MyPos</p>
                      <p style='font-size:15px'>"Online Shop Anda"</p>
                    </div>
                  </el-col>
                </nuxt-link>
              </el-col>
              <el-col :span="14" :xs=24>
                <el-row>
                  <el-col >
                    <el-input placeholder="Ketik nama produk untuk cari" size="mini" style="width:80%" />
                    <nuxt-link to="/cart">
                      <span class='el-icon-shopping-cart-2' style='font-size:30px;;margin-left:15px' />                                      
                    </nuxt-link>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='8' :xs=24 class="button1" style='margin-top:9px'>                    
                    <nuxt-link to="/"><span class="el-icon-school" style='font-size:20px'/> Back Home</nuxt-link>
                    | <nuxt-link to="/freeshiping"><span class='el-icon-bicycle' style='font-size:20px;margin-left:15px'/> Free Shiping</nuxt-link>
                  </el-col>
                  <el-col :span='15' :xs=24 class="button1" align="right" style='margin-top:9px'>
                    <nuxt-link to="/privacy"><span class='el-icon-connection' style='font-size:20px' /> Privacy Policy</nuxt-link>
                    | <nuxt-link to="/cs"><span class='el-icon-service' style='font-size:20px;margin-left:15px'/> Customer Service</nuxt-link>
                  </el-col>
                </el-row>
              </el-col>
            </el-col>
          </div>           
     </el-header>
   
   <el-drawer
        title="Drawer" size="50%"
        :visible.sync="drawer"
        :with-header="true">
        <div style="heigth:500px;overflow-y:scroll">
            <sidebar/>
        </div>
   </el-drawer>


  </div>
  
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
          drawer: false,
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
      this.username=cookie.get("username")
    },
    methods: {

    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl}      
    },


}
</script>
<style scoped>
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