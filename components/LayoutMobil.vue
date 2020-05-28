<template>
   <el-container>
       <el-drawer
        title="Drawer" size="50%"
        :direction="ltr"
        :visible.sync="drawer"
        :with-header="true">
        <div style="heigth:500px;overflow-y:scroll">
            <sidebar/>
        </div>
        </el-drawer>

      <el-col >
        <el-row style="color:white;background: #5f2d96;text-align: center;padding-bottom: 3px;">
          <el-col :span='23'>              
            <p><span @click="drawer = true" class="el-icon-notebook-2"></span> | Account | My Whitelist | Checkout | Log In</p>
          </el-col>
          <el-col :span='23'>
            (0 item) - Rp. 300000
          </el-col>
        </el-row>
        <el-header style="height:90px">
          <div >
            <el-col :sm="1">
            </el-col>
            <el-col :span="23" style="padding:5px">
              <el-col :span="3">
                <img src="~/assets/logo_maxon.png" style="width:30px;height:50px;float:left;margin-right:10px"/>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span='7'>
                    Free Shipping
                  </el-col>
                  <el-col :span='7'>
                    Privacy Policy
                  </el-col>
                  <el-col :span='7'>
                    Customer Service
                  </el-col>
                  <el-col :span='23' style="margin-top:5px">
                    <el-input value="Search" size="mini" />
                  </el-col>
                </el-row>
              </el-col>
            </el-col>
          </div>           
        </el-header>
        <el-row>
        </el-row>
        <el-row>
            <el-col :span="23" style="padding-left:10px">
              <nuxt />
            </el-col>
        </el-row>
      </el-col>
    </el-container>

</template>
<script>
    import menu from '~/components/Menu'
  export default {
    components: {
        'sidebar':menu
    },
    data() {
      return {
           drawer: false,
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

