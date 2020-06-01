<template>
  <div>
      <h1><span class='el-icon-paperclip'> Daftar Sales Order</span></h1>
      <p><i style='color:red'>{{message}}</i></p>


      <el-divider></el-divider> 
             <el-col :span=23 v-if="!isLoggedIn">
                <el-alert type="warning">
                 <p><b>Anda belum login, silahkan login terlebih dahulu</b></p>
                </el-alert>
            </el-col>

      Date From: 
      <el-date-picker v-model="date1" type="datetime" size="mini"/>
      <el-date-picker v-model="date2" type="datetime" size="mini"/>

      <el-input v-model="search" size="mini" placeholder="Type to search" style="width:200px" />
      <el-button size="mini" type="success" @click="handleRefresh()"><span class='el-icon-refresh-left'> Refresh</span></el-button>
  <el-table :data="tableData.filter(data => !search || data.company.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column v-for="col in columns"  :label="col.label" :prop="col.field" 
        v-bind:key="col"  v-model="tableColumn">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" >
      </template>
      <template slot-scope="scope">
        <el-button  size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">View</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination ref="pagination"
      background layout="prev, pager, next"  @current-change="handleCurrentChange" :total="100">
  </el-pagination>

 
  </div>
</template>

<script>
import cookie from 'vue-cookie'

  export default {
    head: {
      title: 'Sales Order'
    },
    data() {
      return {
        isLoggedIn:false,
        tableData: [{sales_order_number: 'Loading...'}],
        search: '',        dialogVisible: false,
        message: "",       mode:"add",
        page:1,            date1: new Date(), 
        date2: new Date(), 
        columns: [
          {label: "Nomor SO", field:"sales_order_number"},
          {label: "Cust No", field:"sold_to_customer"},
          {label: "Customer", field:"company"},
          {label: "Tanggal", field:"sales_date"},
          {label: "Salesman", field:"salesman"},
          {label: "Jumlah", field:"amount"},
          {label: "Status", field:"status"},
        ],
        custList: [{label:"",value:"Unknown"},{label:"",value:"CASH"}],
      }
    },
    methods: {
      handlePrint(){
        alert("Not Available")

      },
      handleRefresh(){
         this.loadData()
      },
      handleEdit(index, row) {
        var vUrl="/so/view/"+this.tableData[index].sales_order_number;
        window.open(vUrl,"_self");
      },
      loadData(){
        this.message="Execute...please wait!"        
        let $user_id=cookie.get("user_id");
        var vUrl='/api/sales_order/browse_data/'+this.page+"?sid_date_from="+this.date1 
          +"&sid_date_to="+this.date2 + "&order_by=sales_date desc&sid_cust_no="+$user_id;
        this.$axios.get(vUrl)
            .then((Response) => {
                this.tableData = Response.data.rows;
                this.message="Ready"
                this.pagination.total=Response.data.rows.length/10
            })
            .catch((err) => {
                console.log("Error")
            })
      },
      handleSizeChange(val) {
        console.log(`${val} items per page`);
        
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.page=val;
        this.loadData();
      },
    },
    mounted: function(){
      this.isLoggedIn=cookie.get("logged_in")
      var d=new Date();  var month = d.getMonth();  var day = d.getDate(); var year = d.getFullYear();
      if (month.length < 2)  month = '0' + month;  if (day.length < 2)    day = '0' + day;

      this.date1=[year,month,'01'].join('-')
      this.date2=[year,month+2,'01'].join('-')
      this.loadData();
    },
       
  } 
</script>