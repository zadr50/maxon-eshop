<template>
    <div style="margin-top:20px">
      <div>
        <div>
        <span class='el-icon-shopping-cart-2' style='float:left;font-size:30px;;margin-left:15px' />  
        <h1>Kantong Belanjaan Saya (Cart)</h1>
        <p>
            Silahkan periksa daftar belanjaan anda dihalaman ini dan apabila sudah benar silahkan 
            klik tombol [Checkout] dibagian bawah
        </p>
        </div>
        <el-col :span=23></el-col>
        <el-row>
            <el-col :span=10 v-for="item in items" v-bind:key="item.line_number" >
            <el-card style="margin:10px;height:120px">
                <el-col :span=7 style=''>
                    <img :src="'http://demo.maxonerp.com/tmp/'+item.item_picture" width="80" height="80" />                    
                </el-col>
                <el-col :span=15>
                    <p>{{item.description}}</p>
                    <p>Qty: {{item.quantity}} {{item.unit}}
                    x Rp. {{item.price}}</p>
                    <p>Sku: {{item.item_number}} Rp. {{item.amount}}</p>
                    <p><el-button type="primary" size="mini" @click="delItem(item.line_number)"> Delete</el-button></p>

                </el-col>
            </el-card>
            </el-col>
            <el-col style="height:50px;padding-top:20px"> 
                <p style="color:red">{{message_cart}}</p>
            </el-col>
        </el-row>
        <el-row>
            <h1><span class='el-icon-bicycle'/> Alamat Kirim</h1>
            <p>Silahkan isi alamat kirim dibawah ini apabila belum terisi alamat kirim 
                silahkan login terlebih dahulu dan isi alamat kirim anda.</p>

            <el-alert type="success">
                <div v-html="alamat" /> 
            </el-alert>
            <el-col style="margin-top:20px;margin-bottom:20px">
                <el-button type="primary" @click="profile"> My Profile</el-button>
            </el-col>
        </el-row>
        <el-row>
            <h1><span class='el-icon-bicycle'/> Jasa Pengiriman</h1>
            <p>Sebelum klik checkout silahkan pilih jasa pengiriman yang ingin anda gunakan</p>
            <el-col style="margin-top:20px;margin-bottom:20px">
                <el-button type="primary" @click="checkout"> Checkout </el-button>
            </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import cookie from 'vue-cookie'

export default {
    head: {
      title: 'My Cart'
    },
    components: {
    },
    data() {
      return {
        alamat:'Loading alamat....',  
        message:'',
        nomor_so:'',
        user_id:'',
        ship_via:'',
        ship_address:'',
        items: null,
        message_cart: '',
      }
    },
    methods: {
        loadUser(){
            var vUrl='/api/user/info/'+this.user_id;
            axios.get(vUrl)
                .then((Response) => {
                    var d=Response.data
                    if (d.success){
                        this.alamat='<b>'+d.username+'</b></br>'+d.address+' '+d.kode_pos+' '+d.city+' '+d.handphone

                    } else {
                        this.alamat="Not Found!"
                    }
                })
                .catch((err) => {
                    this.$toast.show(err);
                })

        },
       loadCart(){
            this.nomor_so=cookie.get("order_no")
            this.ship_via=cookie.get("ship_via")
            this.ship_address=cookie.get("ship_address")   
            this.user_id=cookie.get("user_id")
            this.logged_in=cookie.get("logged_in")
            this.loadCartRun()
       },
       loadCartRun(){
        var vUrl='/api/sales_order/cart/'+this.nomor_so;
        this.$toast.show("Execute...please wait!");
        axios.get(vUrl)
            .then((Response) => {
                this.$toast.clear();
                this.items = Response.data.rows;
                if (this.items.length==0){
                    this.message_cart="Belum ada data barang di keranjang, silahkan belanja dulu"
                }

            })
            .catch((err) => {
                this.$toast.show(err);
            })

       },
       delItem(line_number){
            this.$confirm('Are you sure delete this ?')
            .then(_ => {
            this.message="Execute...please wait!"        
            var vUrl='/api/sales_order/delete_item/'+line_number;
            axios.get(vUrl)
                .then((Response) => {
                    this.$toast.clear();
                    this.loadCartRun();
                })
                .catch((err) => {
                    this.$toast.show(err);
                })
            })
            .catch(_ => {});
       },
       checkout(){
           if(this.user_id=="" || this.logged_in=="false" || this.nomor_so==""){
               this.$toast.show("Silahkan login terlebih dahulu dan isi alamat pengiriman anda !");
               window.open("/login","_self")               
           } else {
            this.message="Execute...please wait!"        
            var vUrl='/api/sales_order/checkout/'+this.nomor_so
            const formData = new FormData()
            formData.append("sales_order_number",this.nomor_so);
            formData.append("sold_to_customer",this.user_id)
            formData.append("shipped_via",this.ship_via)
            axios.post(vUrl,formData)
                .then((Response) => {
                    this.$toast.show("Success.. silahkan lakukan pembayaran");
                    window.open("/payment","_self")
                })
                .catch((err) => {
                    this.$toast.show(err);
                })               
           }
       },
       profile(){
           window.open("/profile","_self")
       }
    },
    mounted() {
      this.loadCart()
      this.loadUser()
      this.item_cart_count=cookie.get("order_item_count",0)
      this.item_cart_amount=cookie.get("order_item_amount",0)
    },

    updated: function () {
       
    },
    created: function () {

    }

  };
</script>
<style>

