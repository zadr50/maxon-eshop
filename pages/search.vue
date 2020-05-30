<template>
    <div>
        <el-row>
            <el-card>
                <p>Search test</p>
                <el-input v-model='search' placeholder="Enter text to search" style="width:80%"/>
                    <nuxt-link to="#"  @click.native="onEnter">
                      <span class='el-icon-search' style='font-size:25px;;margin-left:5px' />                                      
                    </nuxt-link>

            </el-card>
        </el-row>
        <el-row>
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
                          <p>Rp.{{Number(item.item_price).toLocaleString()}}</p>
                        </div>
                    </div>
                  </div>                  
              </el-card>
              <p v-if="items=='null'">Not found items</p>
            </el-col>            
          </el-col>
          <el-col :span=23>
              <el-button @click="prevPage" type="primary"> <span class='el-icon-back'/> Back</el-button>
              <el-input v-model="page" style="width:100px" />
              <el-button @click="nextPage" type="primary">Next  <span class='el-icon-right'/></el-button>
          </el-col>
        </el-row>

    </div>
</template>
<script>
import axios from 'axios'
import cookie from 'vue-cookie'


export default {
    head: {
        title:"Search Products"
    },
    data(){
        return {
            search:'',
            page:1,
            items: null
        }
    },
    mounted() {
        this.search=cookie.get('search')
        this.loadItems()

    },
    methods: {
      onEnter(){
        cookie.set("search",this.search)
        window.open('/search','_self')

      },
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
        var vUrl='/api/inventory/browse_data/?page='+this.page+'&tb_search=' + this.search;
        this.$toast.clear()
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