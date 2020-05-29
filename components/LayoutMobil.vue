<template>
   <el-container>
        <el-row>
            <el-col :span="24" >
              <nuxt />
            </el-col>
        </el-row>
    </el-container>

</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    mounted: function(){
    },
    methods: {
        onClickMenu(){
            this.visibleMenu=!this.visibleMenu
        }
    }
  }
</script>

