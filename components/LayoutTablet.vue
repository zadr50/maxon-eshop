<template>
        <el-container>
      <el-col >
        <el-row style="background: lightgray;text-align: center;padding-bottom: 3px;">
          <el-col :span='4'>
            Phone: 08278288282
          </el-col>
          <el-col :span='4'>
            (0 item) - Rp. 300000
          </el-col>
          <el-col :span='10'>
            <p>My Account | My Whitelist | Checkout | Log In</p>
          </el-col>
        </el-row>
        <el-header style="height:80px">
          <div >
            <el-col :sm="1">
            </el-col>
            <el-col :span="23" style="padding:5px">
              <el-col :span="4">
                <img src="~/assets/logo_maxon.png" style="width:50px;height:50px;float:left;margin-right:10px"/>
                <h2><span class=''> MaxonErp</span></h2>
                <h5>Online Shop</h5>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span='4'>
                    <img src="~/assets/logo_maxon.png"  style="width:30px;height:30px"/>
                    Free Shiping
                  </el-col>
                  <el-col :span='4'>
                    <img src="~/assets/logo_maxon.png"  style="width:30px;height:30px"/>
                    Privacy Policy
                  </el-col>
                  <el-col :span='4'>
                    <img src="~/assets/logo_maxon.png"  style="width:30px;height:30px"/>
                    Customer Service
                  </el-col>
                  <el-col :span='14' style="margin-top:5px">
                    <el-input value="Search" size="mini" />
                  </el-col>
                </el-row>
              </el-col>
            </el-col>
          </div>           
        </el-header>
        <el-row>
        </el-row>
        <el-row>
            <el-col :span="4" >
                <div style="padding-left:10px;height:1000px;margin-right:10px">
                    <div class="box-category">
                        <p class="head-item-type">Categories</p> 
                        <li>Clothing</li>
                        <li>Clothing</li>
                        <li>Clothing</li>
                        <li>Clothing</li>
                        <li>Clothing</li>
                        <li>Clothing</li>
                    </div>
                    <div class="box-cart">
                        <p class="head-item-type">My Cart</p>
                        <p>You have no items in your shopping cart</p>
                    </div>
                    <div class="box-comp">
                        <p class="head-item-type">Compare Products</p>
                        <p>You have no items to compare</p>
                    </div>
                    <div class="box-promo-side">
                        <p class="head-item-type">Promotion</p>
                        <p>This period promo</p>
                    </div>
                    <div class="box-promo-side">
                        <p class="head-item-type">Community Poll</p>
                        <p><el-radio>Green</el-radio></p>
                        <p><el-radio>Red</el-radio></p>
                        <p><el-radio>Black</el-radio></p>
                        <p><el-radio>Magenta</el-radio></p>
                        <p><el-button>Vote</el-button></p>
                    </div>
                    <div class="box-promo-side">
                        <p class="head-item-type">Latest Products</p>
                        <div class="item-side">
                          <img src="asset/logo_maxon.png" width="40px" height='40px'/>
                          <div class="item-side-content">
                              <p class="title">Square Sunglass</p>
                              <p class="price">Rp. 300000</p>
                              <p><el-button>Add to cart</el-button></p>
                          </div>
                        </div>
                        <div class="item-side">
                          <img src="asset/logo_maxon.png" width="40px" height='40px'/>
                          <div class="item-side-content">
                              <p class="title">Square Sunglass</p>
                              <p class="price">Rp. 300000</p>
                              <p><el-button>Add to cart</el-button></p>
                          </div>
                        </div>
                        <div class="item-side">
                          <img src="asset/logo_maxon.png" width="40px" height='40px'/>
                          <div class="item-side-content">
                              <p class="title">Square Sunglass</p>
                              <p class="price">Rp. 300000</p>
                              <p><el-button>Add to cart</el-button></p>
                          </div>
                        </div>
                        <p><el-button>See All</el-button></p>
                    </div>

                </div>
            </el-col>
            <el-col :span="20">
              <nuxt />
            </el-col>
        </el-row>
      </el-col>
    </el-container>

</template>