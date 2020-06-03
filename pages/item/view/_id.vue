<template>
    <div>
        <h1>
            <span class="el-icon-back" @click="$router.back()"  />
            View Item
            <span  v-loading="loading"  />
        </h1>
        <el-row>
            <el-col :span="12" :xs="23" style="margin-top:10px;"  >
                <el-col :span=18>
                <el-row style="height:390px;border:1px solid lightgray;margin-bottom:10px;border-radius:10px;text-align:center;padding-top:20px">
                    <img :src="siteUrl+'tmp/'+photo" width="90%" height="90%" />
                </el-row>
                </el-col>
                <el-col :span=5 style="padding:5px;background:lightgray;text-align:center;margin-left:10px">
                    <el-col :span=23>
                       <img :src="siteUrl+'tmp/'+form.item_picture" width="90%" height="90" @click="show_photo(1)" style="cursor:pointer" />
                    </el-col>
                    <el-col :span=23>
                        <img :src="siteUrl+'tmp/'+form.item_picture2"  width="90%" height="90" @click="show_photo(2)" style="cursor:pointer"/>
                    </el-col>
                    <el-col :span=23>
                        <img :src="siteUrl+'tmp/'+form.item_picture3"  width="90%" height="90" @click="show_photo(3)" style="cursor:pointer"/>
                    </el-col>
                    <el-col :span=23>
                        <img :src="siteUrl+'tmp/'+form.item_picture4"  width="90%" height="90" @click="show_photo(4)" style="cursor:pointer"/>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="10" :xs="23" style="height:400px;margin-top:20px">
                <div class="item">
                    <div class="item_name" style="height:50px;font-size:15px;font-weight:900">
                        {{form.description}}
                    </div>
                    <div class="item_desc" style="min-height:200px;border:1px solid lightgray;border-radius:10px;padding:10px">
                        <div v-html="form.special_features"  v-loading="loading" /> 
                    </div>
                    <div class="sku" style="height:50px;padding:10px;width:100%;">
                        <div class="sku_id" style="float:left">{{form.item_number}}</div>
                        <div class="sku_price" style="text-align:right;color:red;width:70%;font-size:15px;font-weight:900">
                            Rp. {{Number(form.retail).toLocaleString()}},-</div>
                    </div>
                </div>
                <div class="buy">
                    <el-col :span="23" style="padding-left:10px">
                        <el-button @click="decQty()" type="primary" size="mini">-</el-button>
                        <el-input type="" size="mini" v-model="quantity" :value="quantity" style="width:60px;font-size:15px;font-weight:900"/>
                        <el-button @click="incQty()" type="primary" size="mini">+</el-button>
                        <el-button @click="addCart()" type="primary" size="mini">Add Cart</el-button>
                    </el-col>
                </div>
            </el-col>    
        </el-row>
    </div>
</template>

<script>
import cookie from 'vue-cookie'
export default {
    data() {
        return {
            loading:true,
            photo: 'no_image.png',
            photo_url:[],
            siteUrl2: '',
            id: this.$route.params.id,
            quantity:1,
            order_no:'',
            item_name_long:'',
            cookie_item_number:'',
            cookie_description:'',
            cookie_item_picture:'',
            cookie_item_name:'',
            form: {
                item_number:'',
                description:'',
                item_features:'',
                retail:0,
                supplier_number:'',
                category:'',
                discount:0,
                item_picture: 'no_image.png',
                item_picture2: 'no_image.png',
                item_picture3: 'no_image.png',
                item_picture4: 'no_image.png',
            }
            
        }
    },

    methods: {
        incQty(){
            this.quantity++
            console.log(this.quantity)
        },
        decQty(){
            this.quantity--
            if(this.quantity<1)this.quantity=1
        },
        addCart() {
            //set cokies dengan nomor so apabila masih blank
            console.log(this.order_no)
            this.$toast.show("Execute...please wait!");
            
            const formData = new FormData()
            Object.keys(this.form).forEach((key) => {
                formData.append(key, this.form[key])
            })
            formData.append("quantity",this.quantity);
            formData.append("cmd","add_cart");
            formData.append("sales_order_number",this.order_no);

            var vUrl='/api/sales_order/save_item/';
            this.$axios.post(vUrl,formData)
                .then((Response) => {
                    this.form = Response.data;
                    cookie.set("order_item_count",Response.data.item_count)
                    cookie.set("order_item_amount",Response.data.item_amount)
                    if(this.order_no==""){
                        this.order_no=Response.data.sales_order_number
                        cookie.set("order_no",this.order_no)                        
                    } else {
                        this.order_no=Response.data.sales_order_number
                        cookie.set("order_no",this.order_no)
                    }           
                    this.$toast.show("Success data sudah ditambahkan di kantong belanja anda")
                    window.open("/cart","_self")

                })
                .catch((err) => {
                    this.$toast.show(err);
                })

        },
        buy(){
            
        },
        loadItem(){
            this.$toast.show("Execute...please wait!");
            var vUrl='/api/inventory/find/'+this.id;
            this.$axios.get(vUrl)
                .then((Response) => {
                    this.form = Response.data;
                    this.item_name_long=Response.data.item_features
                    this.$toast.clear();
                    this.photo = 'tmp/'+this.form.item_picture
                    this.photo_url.push(this.form.item_picture)
                    this.photo_url.push(this.form.item_picture)
                    this.photo_url.push(this.form.item_picture2)
                    this.photo_url.push(this.form.item_picture3)
                    this.photo_url.push(this.form.item_picture4)
                    this.photo=this.photo_url[0]
                    this.cookie_item_picture=this.siteUrl2 + 'tmp/'+this.photo
                    this.cookie_item_name=this.form.description
                    this.cookie_description=this.form.special_features
                    this.cookie_item_number=this.form.item_number
                    this.loading=false

                })
                .catch((err) => {
                    this.$toast.show(err);
                })
        },
        show_photo(idx){
            this.photo=this.photo_url[idx]
        }
    },
    mutations: {

    },
    mounted(){
        this.order_no=cookie.get("order_no")
        this.siteUrl2=cookie.get("siteUrl2")
        this.cookie_item_number=cookie.get("cookie_item_number")
        this.cookie_description=cookie.get("cookie_description")
        this.cookie_item_picture=this.siteUrl2 + 'tmp/'+cookie.get("cookie_item_picture")
        this.cookie_item_name=cookie.get("cookie_item_name")
        this.loadItem()
    },
    computed: {        
       baseUrl() { 
           return process.env.baseUrl
        },
       siteUrl() { return process.env.siteUrl}      
    },
    head() {
        return  {
            title:"View Item " ,
            meta: [
            {  hid: 'og:type', name: 'og:type', content: "article" },
            {  hid: 'og:title', name: 'og:title', content: this.cookie_item_name },
            {  hid: 'og:image', name: 'og:image', content: this.cookie_item_picture },
            {  hid: 'og:url', name: 'og:url', content: "http://tokomypos.biz.id/item/view/"+this.cookie_item_number},
            { hid: 'og:alt', name: 'og:alt', content: this.cookie_item_name},
            { hid: 'og:description', name: 'og:description', content: this.cookie_description},
            ],
        }
    },


}
</script>