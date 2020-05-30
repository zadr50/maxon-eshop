<template>
    <div>
        <div>
            <h1>
            <span class="el-icon-back" @click="$router.back()"  />
            <span class='el-icon-shopping-cart-2' />  
                Informasi Free Shiping
            </h1>
            <p>
                Free shiping diberlakukan hanya berlaku untuk pemesanan yang berada diwilayah Purwkarta
                sekitaranya.
            </p>
        </div>

    </div>
</template>
<script>
export default {
    head: {
        title: "Free Shiping"
    },
    components: {
        
    },
    body(){
        return {
            
        }
    }
}
</script>