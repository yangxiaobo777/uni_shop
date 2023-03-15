<template>
  <view class="scroll-view-container">
    <scroll-view class="left-scroll-view" scroll-y :style="{height:wh+'px'}">
      <block  v-for= "(item,i) in cateList" :key="i">
        <view :class="['left-scroll-view-item',i===active?'active':'']" @click="changeActive(i)">{{item.cat_name}}</view>
      </block>
     
    </scroll-view>
    <scroll-view class="right-scroll-view" scroll-y :style="{height:wh+'px'}" :scroll-top="scrollTop">
      <view class="cate_iv2" v-for="(item,i) in cateList2" :key="i">
        <view class="cate_iv2_item">/{{item.cat_name}}</view>
        <view class="cate_iv3_list">
          <view class="cate_iv3_item" v-for="(item3,i3) in item.children" :key="i3" @click="gotoGoodsList(item3)">
            <image :src="item3.cat_icon"></image>
            <text>{{item3.cat_name}}</text>
          </view>
        </view>
      </view>
      
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,
        cateList:[],
        active:0,
        cateList2:[],
        scrollTop:0
      };
    },
    onLoad(option) {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      this.getCateList()
    },
    methods:{
      async getCateList(){
       const {data:res} = await uni.$http.get('/api/public/v1/categories')
       if(res.meta.status!==200) return uni.$showMsg()
       this.cateList = res.message
       this.cateList2 = res.message[0].children
       console.log(this.cateList)
      },
      changeActive(i){
        this.active = i
        this.cateList2 = this.cateList[i].children
        this.scrollTop = this.scrollTop===0?1:0
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
   display: flex;
  .left-scroll-view{
    width:120px;
    
    .left-scroll-view-item{
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      
      &.active{
        background-color: #ffffff;
        position: relative;
        
        &::before{
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left:0;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  
  
  
  .right-scroll-view{
    .cate_iv2_item{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cate_iv3_list{
      display: flex;
      flex-wrap: wrap;
      .cate_iv3_item{
        width: 33.33%;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
        
            image {
              width: 60px;
              height: 60px;
            }
        
            text {
              font-size: 12px;
            }
      }
    }
  }
}


</style>
