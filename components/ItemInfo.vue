<template>
<div>
    <div class="box-item" @click="boxItemClick(item.item_no)" title="View Item">
            <div class='foto' >
                <img v-bind:src="siteUrl+'tmp/'+item.icon_file" width="100%" height="170"  />                                   
            </div>
            <div class='item-name'>
                <p>{{item.item_name}}</p>  
            </div>
            <div class="item-foot">
                <div class="sku">
                    <p>{{item.item_no}}</p>
                </div>
                <div class="price">
                    <p>Rp.{{Number(item.item_price).toLocaleString()}}</p>
                </div>
            </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    props: ['item'],
    computed: {
        siteUrl(){return process.env.siteUrl},
        baseUrl(){return process.env.baseUrl}
    },
    methods: {
      boxItemClick(item_no){          
         window.open(this.baseUrl+"item/view/"+item_no,"_self");
      },
    }

}
</script>
<style scoped>
.box-item .item-name {
    height:40px;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
    padding-top:5px;
}
.box-item .foto {
    text-align:center;cursor:pointer;
}
.box-item a {
    text-decoration: none;
    font-weight: bold;
}

.box-item .price {
    color: #f56c6c;
    font-size: larger;
    float: right;
}
.box-item .sku {
    float: left;
    margin-right: 10px;
    color:green;
}
.box-item:hover {
    background: lightgray
}
.box-item {
  height:280px;
  display:block;
  padding:5px;
}

</style>