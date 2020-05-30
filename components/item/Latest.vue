<template>
    <div>
        <p class="head-item-type" style="height:25px;border-bottom:1px solid lightgray">
            <span class='el-icon-position' /> Latest Products</p>
            <div class="item-side" v-for="item in items" :key="item">
                <el-row>
                    <el-col>
                        <img v-bind:src="siteUrl+'tmp/'+item.icon_file" 
                        width="40px" height='40px' style="float:left;margin-right:5px"/>
                        <div class="item-side-content">
                            <p class="title">{{item.item_name}}</p>
                            <p class="price">Rp. {{item.item_price}}</p>
                        </div>
                        </el-col>
                    </el-row>
                    <el-row>                           
                    <p><nuxt-link :to="'/item/view/'+item.item_no">Add To Cart</nuxt-link></p>
                </el-row>
            </div>
            <p>{{message}}</p>
            <p><nuxt-link to="/category/all">Show All</nuxt-link>
        </p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            message:'',
            items:null,
        }
    },

    methods: {
      loadItemsLatest(){
        var vUrl='/api/inventory/browse_data/?sid_latest=true';
        this.message="Execute...please wait!"
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
                this.message=""
            })
            .catch((err) => {
                this.$toast.show(err);
            })
       }
    },
    computed: {
       baseUrl() { return process.env.baseUrl},
       siteUrl() { return process.env.siteUrl}      
    },

}
</script>