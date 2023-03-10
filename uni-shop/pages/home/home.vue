<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>         
      </swiper-item>
    </swiper>
    
    <view class="nav-list">
      <view v-for="item in navList" class="nav-item" @click="toCate(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <navigator class="floor-box-left" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
          </navigator> 
            
          <view class="floor-box-right">
            <navigator v-for="(iitem,i2) in item.product_list"  :key="i2"  class="floor-box-right-item" :url="item.url">
              <image :src="iitem.image_src" mode="widthFix" :style="{width:iitem.image_width+'rpx'}" v-if="i2!=0"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status!=200) return uni.$showMsg()
        this.swiperList = res.message
      },
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status!==200) return uni.$showMsg()
        this.navList = res.message
      },
      toCate(item){
        if(item.name=='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status!==200) return uni.$showMsg()
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 350rpx;
  .swiper-item, image{
    width: 100%;
    height: 100%;
  }
}

.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-img{
    height: 140rpx;
    width: 128rpx;
    
  }
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.floor-box-right{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box{
  display: flex;
  padding-left: 10rpx;
}
</style>
