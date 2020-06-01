<template>
    <div style="margin-top:20px">
      <div>
        <div>
            <h1>
            <span class='el-icon-shopping-cart-2' />  
                Kantong Belanja (Cart)
            </h1>
            <p>
                Silahkan periksa daftar belanjaan anda dihalaman ini dan apabila sudah benar silahkan 
                klik tombol [Checkout] dibagian bawah
            </p>
             <el-col :span=23 v-if="!isLoggedIn">
                <el-alert type="warning">
                 <p><b>Anda belum login, silahkan login terlebih dahulu</b></p>
                </el-alert>
            </el-col>

        </div>
        <el-col>
            <el-card>              
                <table width='100%'>
                    <tr><td>Nomor Order#</td><td><b>{{nomor_so}}</b></td></tr>
                    <tr><td>Tanggal </td><td>{{sales_date}}</td></tr>
                    <tr><td>Jasa Kirim</td><td>{{shipped_via}}</td></tr>                
                    <tr><td>Alamat</td><td><span v-html="alamat" v-bind:key="alamat"></span></td></tr>
                    <tr><td colspan=2><span v-html="customer" v-bind:key="customer"></span></td></tr>
                    <tr><td>Sub Total</td><td>Rp. {{Number(sub_total).toLocaleString()}}</td></tr>
                    <tr><td>Ongkos Kirim</td><td>Rp. {{Number(freight).toLocaleString()}}</td></tr>
                    <tr><td>Total Tagihan</td><td><span style="font-size:24px" >Rp. {{Number(amount).toLocaleString()}} </span></td></tr>
                </table>
            </el-card>
        </el-col>
        <el-col :span=23></el-col>
        <el-row>
            <el-col :span=10 :xs=24 v-for="item in items" v-bind:key="item.line_number" >
            <el-card style="margin:5px;padding:5px">
                <el-col :span=7 style='margin-right:10px'>
                    <img :src="siteUrl+'tmp/'+item.item_picture" width="80" height="80" />                    
                </el-col>
                <el-col :span=15>
                    <p>{{item.description}}</p>
                    <p>Qty: {{item.quantity}} {{item.unit}}
                    x Rp. {{Number(item.price).toLocaleString()}}</p>
                    <p>Sku: {{item.item_number}} Rp. {{Number(item.amount).toLocaleString()}}</p>
                    <p><el-button type="default" size="mini" @click="delItem(item.line_number)"> Delete</el-button></p>

                </el-col>
            </el-card>
            </el-col>
            <el-col style="height:50px;padding-top:20px"> 
                <p style="color:red">{{message_cart}}</p>
            </el-col>
        </el-row>
        <el-row>
          <el-card>  
            <h1><span class='el-icon-bicycle'/> Alamat Kirim</h1>
            <p>Silahkan isi alamat kirim dibawah ini apabila belum terisi alamat kirim 
                silahkan login terlebih dahulu dan isi alamat kirim anda.</p>
            <p v-html="alamat" style="margin-top:20px" ></p>
            <el-button type="warning" size="mini" @click="profile" style="margin-top:20px"> My Profile</el-button>
          </el-card>    
        </el-row>
        <el-row>
          <el-card>
                <h1><span class='el-icon-bicycle'/> Jasa Pengiriman</h1>
                <p>Sebelum klik checkout silahkan pilih jasa pengiriman yang ingin anda gunakan</p>
                <p  style="margin-top:20px" >
                <el-radio v-model="radio_ship_via" label="1" @change="ship_type">TIKI</el-radio>
                <el-radio v-model="radio_ship_via" label="2" @change="ship_type">JNE</el-radio> 
                </p>
            </el-card>
        </el-row>
        <el-row>
            <div style='text-align:center'>
            <el-button type="primary" @click="checkout" style="margin-top:20px"> Checkout </el-button>
            </div>
        </el-row>
      </div>
    </div>
</template>
<script>
import cookie from 'vue-cookie'

export default {
    head: {
      title: 'My Cart'
    },
    components: {
    },
    data() {
      return {
        isLoggedIn:false,  
        radio_ship_via: "1",  
        ship_via:'1',
        alamat:'Loading alamat....',  
        message:'',
        nomor_so:'',
        user_id:'',
        ship_address:'',
        items: null,
        message_cart: '',
        sales_date:'',
        sold_to_customer:'',
        customer:'',
        address:'',
        shipped_via:'',
        sub_total:0,
        freight:0,
        amount:0,
        rekening:'',
        rekening_info:'',

      }
    },
    methods: {
        loadSalesOrder(){
            this.nomor_so=cookie.get("order_no")
            this.message="Execute...please wait!"        
            this.$toast.show(this.message)
            var vUrl='/api/sales_order/view/'+this.nomor_so+"?json=true"
            this.$axios.get(vUrl)
            .then((Response) => {         
                this.$toast.clear()       
                var d=Response.data
                this.sales_date=d.sales_date
                this.sold_to_customer=d.sold_to_customer
                this.customer=d.customer_info
                this.address=d.customer
                this.shipped_via=d.shipped_via
                this.sub_total=d.sub_total
                this.freight=d.freight
                this.amount=d.amount
            })
            .catch((err) => {
                this.$toast.show("Error").goAway(6000);
            })               

        },
        ship_type(){
            this.ship_via=this.radio_ship_via
        },
        loadUser(){
            var vUrl='/api/user/info/'+this.user_id;
            this.$axios.get(vUrl)
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
            this.loadSalesOrder()

       },
       loadCartRun(){
        var vUrl='/api/sales_order/cart/'+this.nomor_so;
        this.$toast.show("Execute...please wait!");
        this.$axios.get(vUrl)
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
            this.$axios.get(vUrl)
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
           this.nomor_so=cookie.get("order_no")
           if(this.nomor_so==null || this.nomor_so==""){
                this.$toast.show("Nomor Order tidak ditemukan ! Silahkan Login atau belanja terlebih dahulu.").goAway(6000);;
                return 

           }
           if(this.user_id=="" || this.user_id==null || this.logged_in==false){
               this.$toast.show("Silahkan login terlebih dahulu dan isi alamat pengiriman anda !");
               window.open("/login","_self") 
               return               
            } 
            this.ship_via=this.radio_ship_via
            if(this.ship_via==null || this.ship_via==""){
                this.$toast.show("Pilih jasa pengiriman !").goAway(6000);;
                return 
            }
            if(this.shipp_via=="1")this.ship_via="TIKI";
            if(this.ship_via=="2")this.ship_via="JNE";
        
            this.message="Execute...please wait!"        
            var vUrl='/api/sales_order/checkout/'+this.nomor_so
            const formData = new FormData()
            formData.append("sales_order_number",this.nomor_so);
            formData.append("sold_to_customer",this.user_id)
            formData.append("shipped_via",this.ship_via)
            this.$axios.post(vUrl,formData)
            .then((Response) => {
                var d=Response.data;
                if(d.success){
                    this.$toast.show("Success.. silahkan lakukan pembayaran");
                    window.open("/checkout","_self")
                } else {
                    $this.$toast.show(d.msg).goAway(6000);
                }
            })
            .catch((err) => {
                this.$toast.show("Error").goAway(6000);
            })               
           
       },
       profile(){
           if(this.user_id=="" || this.user_id==null || this.logged_in==false || this.nomor_so==""){
               this.$toast.show("Silahkan login terlebih dahulu dan isi alamat pengiriman anda !");
               window.open("/login","_self")               
            } else {
               window.open("/profile","_self")
            }
       }
    },
    mounted() {
        this.isLoggedIn=cookie.get("logged_in")
      this.loadCart()
      this.loadUser()
      this.item_cart_count=cookie.get("order_item_count",0)
      this.item_cart_amount=cookie.get("order_item_amount",0)
      
    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl}      
    },
    updated: function () {
       
    },
    created: function () {

    }

  };
</script>
<style>

