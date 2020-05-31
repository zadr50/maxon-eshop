<template>
  <div>
    <h1>
      <span class="el-icon-back" @click="$router.back()"  />
      <span class='el-icon-paperclip'> Sales Order</span>
    </h1>
    <template>
      <el-button @click="printDoc()" size="mini" type="warning"><span class='el-icon-printer'> Print</span></el-button>
    </template>
    <i style='color:red'>{{message}}</i>
    <p>Informasi pesanan atas nomor sales order tersebut</p>
    <el-divider></el-divider>
    <el-row>
      <el-col :span=23 :md="23">
        <table width="100%">
            <tr><td><b>Nomor SO</b></td><td>{{form.sales_order_number}}</td>
              <td><b>Pelanggan</b></td><td>{{form.sold_to_customer}}</td>
            
            </tr> 
            <tr><td><b>Tanggal</b></td><td>{{form.sales_date}}</td>
              <td><b>Status Pesanan</b></td><td>{{form.status}}</td>
            
            </tr> 
            <tr><td><b>Termin</b></td><td>{{form.payment_terms}}</td>
              <td><b>Jasa Kirim</b></td><td>{{form.shipped_via}}</td>            
            </tr> 
            <tr><td><b>Catatan</b></td><td>{{form.comments}}</td></tr> 
            <tr><td><b>Total Item</b></td><td>Rp. {{Number(form.sub_total).toLocaleString()}}</td></tr> 
            <tr><td><b>Ongkos Kirim</b></td><td>Rp. {{Number(form.freight).toLocaleString()}}</td></tr> 
            <tr><td><b>Total Tagihan</b></td><td>Rp. {{Number(form.amount).toLocaleString()}}</td></tr> 
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="23">
        <el-divider></el-divider>
        <el-table  :data="tableData" >
          <el-table-column v-for="col in columns"  :label="col.label" :prop="col.field" 
              v-bind:key="col"  v-model="tableColumn">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    components: {},
    head: {
      title: 'Sales Order View'
    },
    data(){
      return {
        message:'',
        tableData: [{item_number: 'Loading...'}],
        form: {
          sales_order_number: this.$route.params.id,
          sold_to_customer: 'CASH',
          sales_date: new Date(),
          salesman: 'OFFICE',
          payment_terms: 'KREDIT',
          comments: '',
          shipped_via:'',
          status:'',
          freight:0,
          amount:0,
          sub_total:0,
        },
        columns: [
          {label: "Item Number", field:"item_number"},
          {label: "Description", field:"description"},
          {label: "Qty", field:"quantity"},
          {label: "Unit", field:"unit"},
          {label: "Price", field:"price"},
          {label: "Disc%", field:"discount"},
          {label: "Jumlah", field:"amount"},
        ],
        addCount: 0,
        listItems: [],
        item_search: '',

      }  
    },
    mounted() {
      this.getData();
      this.loadItems();
    },
    methods: {
      printDoc() {
        var vUrl='/api/sales_order/print_so/'+this.form.sales_order_number;
        window.open(vUrl,"_blank")

      },
      getData(){
        var vUrl='/api/sales_order/view/'+this.form.sales_order_number+"?json=true";
        this.message="Loading...please wait !"
        this.$axios.get(vUrl)
        .then((Response) => {
            let d=Response.data
            this.form.sales_order_number = d.sales_order_number;
            this.form.sales_date=d.sales_date;
            this.form.sold_to_customer=d.sold_to_customer;
            this.form.payment_terms=d.payment_terms;
            this.form.salesman=d.salesman;
            this.form.comments=d.comments;
            this.form.status=d.status 
            this.form.shipped_via=d.shipped_via
            this.form.fregiht=d.freight
            this.form.amount=d.amount
            this.form.sub_total=d.sub_total
            this.message="Ready"
        })
        .catch((err) => {
            this.message=err;
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },            
      loadItems(){
        this.message="Loading...please wait !";
        var vUrl='/api/sales_order/items/'+this.form.sales_order_number+"?json=true";
        this.$axios.get(vUrl)
          .then((Response) => {
              this.tableData = Response.data.rows;
              this.message="Ready.";
          })
          .catch((err) => {
              this.message=err;
          })        
      },
    },
  }


</script>
<style>
.el-table__row .el-input .el-input__inner{
  border-style:solid 1px black;
}
.hover-row .el-input .el-input__inner{
  border-style:solid;   
}

</style>