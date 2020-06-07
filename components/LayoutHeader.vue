<template>
  <div>
    <el-row id='box-top1' >
          <el-col :span='11' :xs=24 :sm=14>
            <el-row>
              <el-col :span=10 :xs=23 :sm=11>
                <span class="el-icon-back" @click="$router.back()" style='font-size:20px;cursor:pointer' />
                <span class='el-icon-phone-outline' style='font-size:20px'></span>{{phone}}
              </el-col>
              <el-col :span=13 :xs=23 >
                <span class='el-icon-shopping-cart-2' style='font-size:20px;'></span> 
                ({{item_cart_count}} item) - Rp. {{Number(item_cart_amount).toLocaleString()}}            
              </el-col>
            </el-row>
          </el-col>
          <el-col :span='13' :xs=24 :sm=9 align="right">
            <span  v-loading="loading" />
            <span> User: {{username}} </span>
             <span v-if="isLoggedIn=='false' || isLoggedIn=='' || isLoggedIn==null">
              <nuxt-link to="/login">
                  <span class='el-icon-user' style='font-size:20px;'></span>Log In 
              </nuxt-link>
              <nuxt-link to="/login/signup">
                  <span class='el-icon-circle-plus-outline' style='font-size:20px;'></span> Daftar 
              </nuxt-link>
             </span>
             
              <nuxt-link v-if="isLoggedIn=='true'" to="/login/logout">
                <span class='el-icon-user' style='font-size:20px;'></span> Log Out 
            </nuxt-link>
            <span @click="drawer = true" class="el-icon-notebook-2" style="font-size:20px;cursor:pointer"/>  

          </el-col>
    </el-row>
    <el-header >
          <div >
            <el-col :span="24" style="padding:5px">
              <el-col :span=6 :xs=24>
                <nuxt-link to="/">
                  <el-col class="button2" style="margin-right:15px">                                
                    <span class='el-icon-goods' style='font-size:40px;float:left'/> 
                    <div>
                      <p style='font-size:20px'>{{nama_toko}}</p>
                      <p style='font-size:15px'>{{slogan}}</p>
                    </div>
                  </el-col>
                </nuxt-link>
              </el-col>
              <el-col :span=18 :xs=24>
                <el-row>
                  <el-col :span=24>
                    <el-col :span=20 :xs=16>
                      <el-input v-model="search" v-on:keyup.enter="onEnter"  placeholder="Ketik nama produk untuk cari" size="mini"/> 
                    </el-col>
                    <el-col :span=3 :xs=6>
                      <nuxt-link to="#"  @click.native="onEnter">
                        <span class='el-icon-search' style='font-size:25px;;margin-left:5px' />                                      
                      </nuxt-link>
                      <nuxt-link to="/cart">
                        <span class='el-icon-shopping-cart-2' style='font-size:25px;;margin-left:5px' />                                      
                      </nuxt-link>
                    </el-col>
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
        nama_toko:'Toko MyPos',
        slogan:'Online Shop Anda',
        phone:'000000000',
        search:'',
          drawer: false,
          item_cart_count:0,
          item_cart_amount:0,
          isLoggedIn: false,
          username:'',
          loading:true,
          active: false
      };
    },
    mounted: function(){
      this.item_cart_count=cookie.get("order_item_count",0)
      this.item_cart_amount=cookie.get("order_item_amount",0)
      this.isLoggedIn=cookie.get("logged_in")
      var user=cookie.get("user_info")
      this.username=cookie.get("username")
      if(this.username==""){
        cookie.set("logged_in",true)
        this.username=cookie.get("user_id")
      }
      this.loading=false
      this.search=cookie.get("search")
      this.loadToko();
    },
    methods: {
      onEnter(){
        cookie.set("search",this.search)
        window.open('/search','_self')
      },
      loadToko(){
        var vUrl='api/company/view_json';
        this.$toast.show("Execute...please wait!").goAway(6000);
        this.$axios.get(vUrl)
            .then((Response) => {
                var d=Response.data
                console.log(d)
                if(d.success){
                    this.nama_toko=d.row.company_name
                    this.alamat=d.row.street
                    this.nama_kontak = d.row.invoice_contact
                    this.phone=d.row.phone_number
                    this.slogan=d.row.slogan
                    this.email=d.row.email
                } else {
                    this.$toast.show("Errror!"+d.message).goAway(6000);
                }
            })
            .catch((err) => {
                this.$toast.show(err).goAway(6000);
            })

      }
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