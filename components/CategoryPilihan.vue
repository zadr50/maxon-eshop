<template>
  <div>
    <el-col>
        <el-col :span=4 :xs=6  >
            <div style="cursor:pointer;" @click="box_item('gelang')">
            <el-card >
                <img v-bind:src="siteUrl+'tmp/gelang1.jpeg'" style="height:50px;width:50px" />
                <p><b>Gelang</b></p>
            </el-card>
            </div>
        </el-col>
        <el-col :span=4 :xs=6>
            <div style="cursor:pointer;" @click="box_item('apd')">
            <el-card>
                <img v-bind:src="siteUrl+'tmp/vicks3.JPG'" style="height:50px;width:50px" />
                <p><b>Alkes</b></p>
            </el-card>
            </div>
        </el-col>
        <el-col :span=4 :xs=6>
            <div style="cursor:pointer;" @click="box_item('fashion')">
            <el-card>
                <img v-bind:src="siteUrl+'tmp/bajukoko.jpg'" style="height:50px;width:50px" />
                <p><b>Fashion</b></p>
            </el-card>
            </div>
        </el-col>
        <el-col :span=4 :xs=6>
            <div style="cursor:pointer;" @click="box_item('komputer')">
            <el-card>
                <img v-bind:src="siteUrl+'tmp/komputer.png'" style="height:50px;width:50px" />
                <p><b>Komputer</b></p>
            </el-card>
            </div>
        </el-col>
        <el-col :span=4 :xs=6>
            <div style="cursor:pointer;" @click="box_item('handphone')">
            <el-card>
                <img v-bind:src="siteUrl+'tmp/samsung1.jpg'" style="height:50px;width:50px" />
                <p><b>Handphone</b></p>
            </el-card>
            </div>
        </el-col>
        <el-col :span=4 :xs=6>
            <div style="cursor:pointer;" @click="box_item('makanan')">
            <el-card>
                <img v-bind:src="siteUrl+'tmp/00015.jpg'" style="height:50px;width:50px" />
                <p><b>Makanan</b></p>
            </el-card>
            </div>
        </el-col>
        
    </el-col>
  </div>
</template>
<script>
import cookie from 'vue-cookie'
export default {
    data(){
        return {

        }
    },
    computed: {
       siteUrl() { return process.env.siteUrl },      
       baseUrl() { return process.env.baseUrl }      

    },
    methods: {
      box_item(cat){
         cookie.set("category",cat)
         //window.open(this.baseUrl+"category/"+cat,"_self");
         this.$router.push("category/"+cat)

      },
    }

}
</script>