<template>
      <el-col >        
        <el-row>
            <el-col :span="4" :xs="6" >
                <sidebar/>
            </el-col>
            <el-col :span="20" :xs="17">
              <nuxt />
            </el-col>
        </el-row>
      </el-col>
</template>

<script>
import menu from '~/components/Menu'

export default {
  components: {
      'sidebar':menu
  },
}
</script>

<style >
</style>