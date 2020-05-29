<template>
    <div>
      <h1>Search item with category</h1>
      </hr>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' />category: {{category}} {{message}}
        </el-col>
        <el-col :span="24" >
            <el-col v-for="item in items" :key="item" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card class="box-item" >
                  <div class="divItem" >
                    <div class='foto' style="text-align:center;cursor:pointer; " 
                        @click="boxItemClick(item.item_no)" >
                    <img v-bind:src="siteUrl+'tmp/'+item.icon_file" width="200" height="170"  />                                   
                    </div>
                    <div class='item_name'>
                      <p>{{item.item_name}}</p>  
                    </div>
                    <div class="item_foot">
                        <div class="sku">
                          <p>{{item.item_no}}</p>
                        </div>
                        <div class="price">
                          <p>{{item.item_price}}</p>
                        </div>
                    </div>
                  </div>                  
              </el-card>
              <p v-if="items=='null'">Not found items</p>
            </el-col>            
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
              <el-button @click="prevPage" type="primary" size="mini"> Previous Page</el-button>
              Page: <span style="font-size:20px"> {{this.page}} </span>
              <el-button @click="nextPage" type="primary" size="mini"> Next Page</el-button>
          </el-col>
      </el-row>


    </div>
</template>

<script>
import axios from 'axios'

export default {
    head: {
        title:"Search Item"
    },
    data() {
    return {
        page:1,
        message:'',
        category:this.$route.params.id,
        items:null,
      }
    },
    mounted(){
        if(this.category=="undefined")this.category=""
        this.loadItems()
    },
    methods: {
        prevPage(){
            this.page--
            if(this.page<1)this.page=1
            this.loadItems()
        },
        nextPage(){            
            this.page++
            this.loadItems()
        },
       boxItemClick(item_no){
             window.open("../item/view/"+item_no,"_self");
       },
  
      loadItems(){
        var cat=this.category
        if(cat=="undefined")$cat=""
        var vUrl='/api/inventory/browse_data/?page='+this.page+'&sid_cat='+cat;
        this.message="Execute...please wait!"
        this.$toast.show(this.message);
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
                this.message="Ready"
                this.$toast.clear();
            })
            .catch((err) => {
                this.$toast.show(err);
            })

       }

    },
  computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl}      
  }
}
</script>