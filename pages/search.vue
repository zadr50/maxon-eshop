<template>
    <div>
        <el-row>
           <el-col :span="24" >
            <el-col v-for="item in items" :key="item.item_no" :span="4"  :md="6"  :sm="6" :xs="12" >
              <el-card class="box-item" >
                <itemInfo :item="item" />
              </el-card>
              <p v-if="items=='null'">Not found items</p>
            </el-col>            
          </el-col>
          <el-col :span=23>
              <el-button @click="prevPage" type="primary"> <span class='el-icon-back'/> Back</el-button>
              Page: <el-input v-model="page" style="width:100px" />
              <el-button @click="nextPage" type="primary">Next  <span class='el-icon-right'/></el-button>
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
         this.$route.push("item/view/"+item_no)
       },
      loadItems(){
        var vUrl='/api/inventory/browse_data/?page='+this.page+'&tb_search=' + this.search;
        this.$toast.clear()
        this.message="Execute...please wait!"
        this.$toast.show(this.message).goAway(5000);
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