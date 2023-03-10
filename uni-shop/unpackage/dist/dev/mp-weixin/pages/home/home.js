"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
  methods: {
    async getSwiperList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
      if (res.meta.status != 200)
        return common_vendor.index.$showMsg();
      this.swiperList = res.message;
    },
    async getNavList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.navList = res.message;
    },
    toCate(item) {
      if (item.name == "分类") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    },
    async getFloorList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.floorList = res.message;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
        c: i
      };
    }),
    b: common_vendor.f($data.navList, (item, k0, i0) => {
      return {
        a: item.image_src,
        b: common_vendor.o(($event) => $options.toCate(item))
      };
    }),
    c: common_vendor.f($data.floorList, (item, i, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list, (iitem, i2, i1) => {
          return common_vendor.e({
            a: i2 != 0
          }, i2 != 0 ? {
            b: iitem.image_src,
            c: iitem.image_width + "rpx"
          } : {}, {
            d: i2
          });
        }),
        f: item.url,
        g: i
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/minipro/uni-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
