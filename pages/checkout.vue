<template>
    <div>
      <el-row>
         <el-col :span=12 :xs=23>  
            <el-col>
                <h1>
                    <span class="el-icon-back" @click="$router.back()"  />
                    <span class='el-icon-shopping-cart-2' />  
                    Data Pesanan
                </h1>
                <el-col >
                <el-card>              
                    <p>Nomor Order# : <b>{{sales_order_number}}</b></p>
                    <p>Tanggal : {{sales_date}}</p>
                    <p>Jasa Kirim: {{shipped_via}}</p>
                    <div>
                        <p>YourId: {{sold_to_customer}}</p>
                        <p>Alamat: </p>
                        <p><span v-html="customer" v-bind:key="customer"></span></p>
                    </div>
                </el-card>
                </el-col>
                <el-table :data="tableData" v-show="false">
                    <el-table-column v-for="col in columns"  :label="col.label" :prop="col.field" 
                        v-bind:key="col"  v-model="tableColumn">
                    </el-table-column>
                </el-table>
                <el-card>
                <p>Sub Total Item: Rp. {{Number(sub_total).toLocaleString()}}</p>
                <p>Ongkos Kirim: Rp. {{Number(freight).toLocaleString()}}</p>
                </el-card>
                <p>Total Tagihan: <span style="font-size:24px" >Rp. {{Number(amount).toLocaleString()}} </span></p>

            </el-col>
            <el-col style="margin-top:20px">
                <h2>Informasi Pembayaran</h2>
                <div style="color:red">
                <p>Silahkan lakukan pembayaran ke rekening dibawah ini: </p>
                <p>Apabila pembayaran belum masuk sampai besok maka orderan akan dibatalkan oleh sistim</p>
                </div>
                <el-card>
                <div  style="font-size:24px">
                <p><b>{{rekening}}</b></p>
                <p><span v-html="rekening_info"/></p>
                </div>
                </el-card>
            </el-col>
         </el-col>
    </el-row>        
  </div>
</template>
<script>
import axios from 'axios';
import cookie from 'vue-cookie'
export default {
    head: {
        title: 'Waiting Payment'
    },
    data(){
        return {
            sales_order_number:'',
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
            columns: [
                {label: "Kode", field:"item_number"},
                {label: "Nama Barang", field:"description"},
                {label: "Qty", field:"quantity"},
                {label: "Harga", field:"price"},
                {label: "Jumlah", field:"amount"},
            ],
            tableData: null

        }
    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl},      
    },
    mounted() {
        this.sales_order_number=cookie.get("order_no");
        this.rekening=cookie.get("rekening") || "123.121.124.124"
        this.rekening_info=cookie.get("rekening_info") || "<p>Bank Centeral Asia (BCA)</p><p>Andri Andriana</p>"
        this.loadSalesOrder()
    },
    methods: {
        loadSalesOrder(){
            this.message="Execute...please wait!"        
            this.$toast.show(this.message)
            var vUrl='/api/sales_order/view/'+this.sales_order_number+"?json=true"
            axios.get(vUrl)
            .then((Response) => {         
                this.$toast.clear()       
                var d=Response.data
                this.sales_order_number=d.sales_order_number
                this.sales_date=d.sales_date
                this.sold_to_customer=d.sold_to_customer
                this.customer=d.customer_info
                this.address=d.customer
                this.shipped_via=d.shipped_via
                this.sub_total=d.sub_total
                this.freight=d.freight
                this.amount=d.amount
                
                //console.log("loadSalesOrder")
                //console.log(d.items)
                var item=JSON.parse(d.items)
                this.tableData=item.rows;

            })
            .catch((err) => {
                this.$toast.show("Error").goAway(6000);
            })               

        }
    }
}
</script>