<template>
    <div>
        <p>Processing logout...</p>
    </div>
</template>

<script>
import cookie from 'vue-cookie'
import axios from '@nuxtjs/axios'

export default {
    methods: {

    },
    mounted(){
        cookie.set("logged_in",false)
        cookie.set("username","")
        cookie.set("user_info","")
        window.open("/","_self")
        this.$toast.show("Logout Success")
    }
}
</script>
