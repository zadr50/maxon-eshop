<template>
    <div>
      <h1>Search item with category
          <span  v-loading="loading"  />
      </h1>
      </hr>
      <el-row>
        <el-col :span="24" class="head-item-type" style="height:40px;padding-top:15px">
            <span class='el-icon-position' />category: {{category}} {{message}}
        </el-col>
        <el-col :span="24" >
            <el-col v-for="item in items" :key="item.item_no" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card  >
                <itemInfo :item="item" />
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
import cookie from 'vue-cookie'
import itemInfo from '~/components/ItemInfo'

export default {
    components: {itemInfo},
    head: {
        title:"Search Item"
    },
    data() {
    return {
      loading:true,
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
        if(cat=="undefined")cat=""
        cookie.set("category",cat)
        var vUrl='/api/inventory/browse_data/?page='+this.page+'&sid_cat='+cat;
        this.message="Execute...please wait!"
        this.$toast.show(this.message);
        this.$axios.get(vUrl)
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
                this.$toast.clear()
                this.loading=false
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