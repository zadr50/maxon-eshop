<template>
    <div>
      <el-col >  
        <el-card>
          <el-row>
              <el-col>
              <b style='color:green'>Pulsa Handphone</b>
              </el-col>
          </el-row>
          <el-row>                
            <el-col :span=8 style="margin-right:5px">
                <b>Nomor Telpon </b>
                <el-input v-model="nomor_hape" size="mini" placeholder="08000000000" />
            </el-col>
            <el-col :span=8 style="margin-right:5px">
                <b>Nominal </b>
                <el-input v-model="pulsa_nominal" size="mini" />
            </el-col>
            <el-col :span=2>
                <el-button type="primary" size="mini" style="margin-top:15px"> Beli</el-button>
            </el-col>
          </el-row>
          <el-row>
            <p style='color:red'><i>*Silahkan login dan isi deposit</i></p>
          </el-row>
        </el-card>
      </el-col>
    </div>
</template>
<script>
export default {
    head: {
    },
    body(){
        return {
            nomor_hape:'',
            pulsa_nominal:'',
        }
    },
    computed: {
       siteUrl() { return process.env.siteUrl }      
    }

}
</script>