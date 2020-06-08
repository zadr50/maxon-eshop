<template>
    <div>
        <p>Processing logout...</p>
    </div>
</template>

<script>
import cookie from 'vue-cookie'

export default {
    methods: {

    },
    mounted(){
        cookie.delete("logged_in")
        cookie.delete("username")
        cookie.delete("user_info")
        cookie.delete("user_id")
        cookie.delete("order_no")
        cookie.delete("search")
        cookie.delete("order_item_count")
        cookie.delete("order_item_amount")
        cookie.delete("cookie_description")
        cookie.delete("cookie_item_name")
        cookie.delete("cookie_item_number")
        cookie.delete("cookie_item_picture")
        cookie.delete("siteUrl2")
        cookie.delete("category")

        //window.open("/","_self")
        this.$route.push("/")
        this.$toast.show("Logout Success")
    }
}
</script>
