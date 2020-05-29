<template>
  <div>
    <el-row>
      <el-col :span=24 style="color: white;background: linear-gradient(-180deg,#b603c1,#e014ec);">
        <div >
          <LayoutHeader/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=24>
        <div v-if="$device.isMobile">
          <layout-mobile/>
        </div>
        <div v-else>
          <layout-desktop/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=24>
        <div style="display:block;background:lightgray;color:black">
          <LayoutFooter/>
        </div>
     </el-col>
    </el-row>
  </div>
</template>

<script>

  import { mapStateMutations,mapState } from 'vuex'
  import Menu from '~/components/Menu.vue'
  import LayoutDesktop from '~/components/LayoutDesktop.vue'
  import LayoutMobile from '~/components/LayoutMobil.vue'
  import LayoutTablet from '~/components/LayoutTablet.vue'
  import LayoutFooter from '~/components/LayoutFooter'
  import LayoutHeader from '~/components/LayoutHeader'

  export default {
    data() {
      return {
        isLoggedIn: true,
      };
    },
    components:{
      LayoutHeader,LayoutFooter,
      "app-sidebar":Menu,
      'layout-desktop':LayoutDesktop,
      'layout-mobile':LayoutMobile,
      'layout-tablet':LayoutTablet
    },
    methods: {
      onCollapse() {
        this.$refs.appSidebar.onCollapse()      
      }
    }
  };
</script>

<style>
html {
  font-family: 'Segoe UI','Source Sans Pro', -apple-system, BlinkMacSystemFont, 
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size:12px;
  word-spacing: 2px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.el-header {
}
.el-menu-item a {
    color: white;
    text-decoration: none;
}
.el-container {
  min-height: 900px;
}
.el-main {
  padding:1px;
}
a {
  
}
</style>
