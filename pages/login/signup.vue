<template>
<div >
  <div style="margin-right:15px;float:left"><span  class='el-icon-position' style="font-size:40px" /></div>
  <div style="margin-bottom:20px">
    <h2 class="text-center" >Pendaftaran Login</h2>
    <p>Silahkan isi informasi login dibawah ini</p>
  </div>
  
  <el-alert v-if="error" show variant="danger">{{ error + '' }}</el-alert>

  <el-row align-h="center" align-v="center" >
    <el-col :span="10" :xs=23>
      <el-card bg-variant="light">
        <form @keydown.enter="login">
            <el-form-group>
                <el-label>Enter User Id</el-label>
                <el-input v-model="user_id" placeholder="user_id" />
            </el-form-group>
            <el-form-group label="Username">
                <el-label>Isi nama anda</el-label>
                <el-input v-model="username" placeholder="isi nama anda" />
            </el-form-group>
            <el-form-group label="Password" >
                <el-label >Enter password</el-label>
                <el-input type="password" v-model="password" placeholder="isi password" />
            </el-form-group>
            <el-form-group label="Alamat">
                <el-label>Alamat anda (Pengiriman)</el-label>
                <el-input type='textarea' v-model="address" placeholder="address"/>
            </el-form-group>
            <el-form-group label="Kota">
                <el-label>Kota</el-label>
                <el-input v-model="city" placeholder="city"/>
            </el-form-group>
            <el-form-group label="Email">
                <el-label>Email</el-label>
                <el-input v-model="email" placeholder="email@address.com"/>
            </el-form-group>
            <el-form-group>
                <el-label>Nomor Handphone</el-label>
                <el-input v-model="handphone" placeholder="handhpone"/>
            </el-form-group>

            <el-col class="text-center" style="margin-top:15px;margin-bottom:10px" center>
            <el-col :span=19>
                <el-button @click="signup" type="primary"> Submit</el-button>
            </el-col>
            </el-col>
            <div style='color:red'>{{message}}</div>
        </form>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import cookie from 'vue-cookie'
export default {
  head: {
    title:'Pendaftaran User Login'
  },
  middleware: [],
  components: {  },
  data() {
    return {
      message:'',
      user_id:'',
        username: '',
        password: '',
        address:'',
        city:'',
        email:'',
        handphone:'',
      error: null
    }
  },
  computed: {
  },
  methods: {
    signup(){
      if(this.user_id=="" || this.password=="" || this.username==''){
        this.$toast.show("Isi username dan password").goAway(6000)
        return false
      }
      this.message="Execute...please wait!"        
      const formData = new FormData()
      formData.append("user_id",this.user_id)
      formData.append("username",this.username)
      formData.append("password",this.password)
      formData.append("address",this.address)
      formData.append("city",this.city)
      formData.append("email",this.email)
      formData.append("handphone",this.handphone)
      formData.append("mode","add")

      var vUrl='/api/user/save_json';
      this.$axios.post(vUrl,formData)
        .then((Response) => {
            var d=Response.data;
            if(d.success){
              cookie.set("user_id",this.user_id)
              cookie.set("username",this.username)
              cookie.set("logged_in",true)
              cookie.set("user_info","")
              this.message="Success.. redirect to home"
              this.$toast.show(this.message).goAway(6000)              
              window.open("/","_self")
            } else {
              this.message="Error: " + d.msg + "Silahkan di ulangi lagi"
              this.$toast.show(this.message).goAway(6000)
            }
        })
        .catch((err) => {
            this.message="Tidak bisa bikin user, coba ganti user_id yang lain";
        }) 

    }
  }
}
</script>
