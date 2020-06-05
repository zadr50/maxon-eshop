<template>
  <div>
      <el-row>
        <el-col :span="24" >
            <el-col v-for="item in items" :key="item" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card class="box-item" >
                    <div class='foto' style="text-align:center;cursor:pointer; " 
                      @click="boxItemClick(item.item_no,item.icon_file,item.item_name)" >
                      <img v-bind:src="siteUrl+'tmp/'+item.icon_file" width="100%" height="170"  />                                   
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
              </el-card>
            </el-col>            
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary" @click="nextPage"> Halaman Selanjutnya</el-button>
          <span>{{message}}</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import cookie from 'vue-cookie'
export default {
    data(){
        return {
            items:null,
            page: 1,
            message: '',
            loading: true,
        }
    },
    methods: {
      prevPage(){
        this.page--
        if(this.page<1)this.page=1
        this.message="Page: " + this.page
        this.loadItems()
      },
      nextPage(){
        this.page++
        this.message="Page: " + this.page
        this.loadItems()
      },
       boxItemClick(item_no,icon_file,item_name){
         cookie.set("cookie_item_picture",icon_file)
         cookie.set("cookie_item_name",item_name)
         cookie.set("cookie_item_number",item_no)
         window.open("item/view/"+item_no,"_self");
       },
       loadItems(){
        this.message="Loading page " + this.page + "..."
        var vUrl='/api/inventory/browse_data/?stat=features&page=' + this.page;
        this.$axios.get(vUrl)
            .then((Response) => {
                var o = Response.data.rows;
                if(this.page==1){
                    var data=[];
                    for(var i=0;i<o.length;i++){
                      data.push(
                        {item_no:o[i].item_number,item_name:o[i].description,
                        item_price:o[i].retail,icon_file: o[i].item_picture}
                      )
                  }
                  this.items=data
                } else {
                  for(var i=0;i<o.length;i++){
                    this.items.push(
                      {item_no:o[i].item_number,item_name:o[i].description,
                      item_price:o[i].retail,icon_file: o[i].item_picture}
                    )
                  }
                  this.$toast.clear();
                  this.loading=false
                  this.message=""
                }
            })
            .catch((err) => {
                this.$toast.show(err).goAway(6000);
            })
       }


    },
    mounted(){
      this.loadItems()
    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { 
          this.siteUrl2=process.env.siteUrl; 
          return process.env.siteUrl
       }      

    }

}
</script>