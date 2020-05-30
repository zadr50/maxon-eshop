<template>
<div >
  <div style="margin-right:15px;float:left"><span  class='el-icon-position' style="font-size:40px" /></div>
  <div style="margin-bottom:20px">
    <h2 class="text-center" >Login</h2>
    <p>Silahkan isi login anda dibawah ini dan isi password dengan benar</p>
  </div>
  
  <el-alert v-if="error" show variant="danger">{{ error + '' }}</el-alert>
  <el-alert show v-if="redirect">
    You have to login before accessing to <strong>{{ redirect }}</strong>
  </el-alert>


  <el-row align-h="center" align-v="center" >
    <el-col :span="10">
      <el-card bg-variant="light">
        <busy-overlay />
        <form @keydown.enter="login">
        <el-form-group label="Username">
          <el-label>Enter userid</el-label>
          <el-input v-model="username" placeholder="anything" ref="username" />
        </el-form-group>

        <el-form-group label="Password" >
          <el-label >Enter password</el-label>
          <el-input type="password" v-model="password" placeholder="123" />
        </el-form-group>

        <el-col class="text-center" style="margin-top:15px;margin-bottom:10px" center>
          <el-col :span=15>
          <el-button @click="signup" type="warning" block> Sign Up</el-button>
          </el-col>
          <el-button @click="login" type="primary" block> Login</el-button>
        </el-col>
        <div style='color:red'>{{message}}</div>
        </form>
      </el-card>
    </el-col>
    <el-col :md="5" class="text-center pt-4" v-show="false">
        <el-card title="Social Login" bg-variant="light">
          <div v-for="s in strategies" :key="s.key" class="mb-2">
          <el-button @click="loginWith" block :style="{background: s.color}" size="mini" 
            style="width:90%;margin-bottom:10px;border-radius:5px;color:white">
            Login with {{ s.name }}</el-button>


          </div>
        </el-card>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.login-button {
  border: 0;
};
</style>

<script>
import cookie from 'vue-cookie'
export default {
  middleware: [],
  components: {  },
  data() {
    return {
      message:'',
      username: '',
      password: '',
      error: null
    }
  },
  computed: {
    strategies: () => ([
     { key: 'auth0', name: 'Auth0', color: '#ec5425' },
     { key: 'google', name: 'Google', color: '#4284f4' },
     { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
     { key: 'github', name: 'GitHub', color: '#202326' }
    ]),
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    }
  },
  methods: {
    loginWith(k){
      this.$toast.show("login with "+k)
    },
    login() {
      this.error = null
      if(this.username=="" || this.password==""){
        this.$toast.show("Isi username dan password")
        return false
      }
      this.message="Execute...please wait!"        
      this.$toast.show(this.message)
      var vUrl='/api/user/login/'+this.username+"/"+this.password;
      this.$axios.get(vUrl)
        .then((Response) => {
            var d=Response.data;
            if(d.success){
              cookie.set("user_id",this.username)
              cookie.set("username",d.rows.username)
              cookie.set("logged_in",true)
              cookie.set("user_info",d.rows)
              this.message="Success.. redirect to home"              
              window.open("/","_self")
            } else {
              this.message="Wrong username or password !"
            }
        })
        .catch((err) => {
            this.message=err;
        }) 
    },
    signup(){
      if(this.username=="" || this.password==""){
        this.$toast.show("Isi username dan password")
        return false
      }
      this.message="Execute...please wait!"        
      this.$toast.show(this.message)
      const formData = new FormData()
      formData.append("user_id",this.username)
      formData.append("password",this.password)
      formData.append("mode","add")


      var vUrl='/api/user/save_json';
      this.$axios.post(vUrl,formData)
        .then((Response) => {
            var d=Response.data;
            if(d.success){
              cookie.set("user_id",this.username)
              cookie.set("username",this.username)
              cookie.set("logged_in",true)
              cookie.set("user_info","")
              this.message="Success.. redirect to home"
              this.$toast.show(this.message)              
              window.open("/","_self")
            } else {
              this.message="Error: " + d.msg + "Silahkan di ulangi lagi"
              this.$toast.show(this.message).goAway(6000)
            }
        })
        .catch((err) => {
            this.message=err;
        }) 

    }
  }
}
</script>
