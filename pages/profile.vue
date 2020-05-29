<template>
  <div>     
    <h1>
        <span class="el-icon-back" @click="$router.back()"  />
        <span class="el-icon-s-custom"/> 
        My Profile Info
    </h1>
    <span v-loading="loading" /><span>{{message}}</span>
    <el-divider></el-divider>
    <el-col :span=15>
      <el-form ref="form" :model="form" label-width="120px" >
          <el-form-item label="User Id">
              <el-input v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="Password">
              <el-input type='password' v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="Nama">
              <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Email">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Alamat">
              <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
      </el-form>    
      <div>
           <el-button type="primary" @click="onSubmit">Save</el-button>
      </div>        
    </el-col>  
  </div>
</template>

<script>

import cookie from 'vue-cookie'
import axios from 'axios'

export default {
    head: {
      title: 'My Profile'
    },
    data(){
        return {
            loading: true,
            message:'',
            form: {
                user_id:'',
                username:'',
                address:'',
                city:'',
                handphone:'',
                level:'',
                email:'',
                password:''
            }
        }
    },
    methods: {
      loadData(){
        var vUrl='/api/user/info/'+this.form.user_id;
        this.message="Execute...please wait!"
        
        axios.get(vUrl)
            .then((Response) => {
                var d  = Response.data;
                this.message="Ready"
                this.form=d
                this.loading=false

            })
            .catch((err) => {
                this.message=err
            })

      },
      onSubmit() {
        const formData = new FormData()
        formData.append("user_id",this.form.user_id)
        formData.append("username",this.form.username)
        formData.append("password",this.form.password)
        formData.append("email",this.form.email)
        formData.append("address",this.form.address)
        formData.append("mode","view");
        this.loading=true
        this.message="Execute... please wait"
        var vUrl='/api/user/save_json';

        axios.post(vUrl,formData)
            .then((Response) => {
                if(Response.data.success){
                    this.message=Response.data.msg;
                    this.loading=false
                    window.open('/cart','_self')
                } else {
                    this.message=Response.data.msg                    
                }
            })
            .catch((err) => {
                this.message="Error"
            })
        },
    },
    mounted: function(){      
        this.form.user_id= cookie.get("user_id")
        this.loadData()
    },
}
</script>