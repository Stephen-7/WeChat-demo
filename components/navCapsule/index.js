let app = getApp()
Component({
  externalClasses: ["parent-class"],
  properties: {
    nav: {
      type: Object,
      value: {},
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      var t = this
      let {
        showNavigationBarLoading,
        hideNavigationBarLoading
      } = Object.assign({}, wx)
      wx._showNavigationBarLoading || wx.__defineGetter__('showNavigationBarLoading', function () {
        wx._showNavigationBarLoading = 1
        return function (o) {
          var p = getCurrentPages().pop() || {},
            cb = p ? p.selectComponent('#c-bar') : false
          cb && cb.setData && cb.setData({
            loading: !0
          })
          return showNavigationBarLoading(o)
        }
      })
      wx._hideNavigationBarLoading || wx.__defineGetter__('hideNavigationBarLoading', function () {
        wx._hideNavigationBarLoading = 1
        return function (o) {
          var p = getCurrentPages().pop() || {},
            cb = p ? p.selectComponent('#c-bar') : false
          cb && cb.setData && cb.setData({
            loading: !1
          })
          return hideNavigationBarLoading(o)
        }
      })
    },
    hide: function () {},
    resize: function () {},
  },
  data: {
    custom: wx.getMenuButtonBoundingClientRect(),
    cBarHeight: 68,
    cBarTitleTop: 20,
    cBarTitleHeight: 68,
    cBarTitlePaddingTop: 20,
    isiPad: /^ipad/i.test(app.globalData.systemInfo.model || ""),
    canvasHeight: 300,
    canvasWidth: 300,
    toHome: '',
    top: 0, // 高度
    title: "小程序-deom", // 标题
    showBackHome: false, // 左胶囊返回键&&首页键
    showBack: false, // 左胶囊单返回键
    showHome: false, // 左胶囊单首页键
    showBackText: false, // 左胶囊单返回键文字
    navigateBack: false, // 是否返回navigateBack&&switchTab
    bgColor:false, // 背景颜色
    borderColor: false, // borderBottom边框颜色
    showFixed: false, // 是否浮动
  },
  observers: {
    nav: function (val) {
      console.log(val, 1222)
      let color = '';
      if (val.top > 100 || val.bgColor) {
        color = '#ffffff'
      } else {
        color = '';
      }
      // if (val.bgColor) {
      //   color = '#ffffff'
      // } else {
      //   color = '';
      // }
      this.setData({
        bgColor:color,
        title: val.title,
        showBackHome: val.showBackHome,
        showBack: val.showBack,
        showHome: val.showHome,
        showBackText: val.showBackText,
        navigateBack: val.navigateBack ? 'navigateBack' : 'switchTab',
        borderColor: val.borderColor,
        showFixed:val.showFixed,
      })
    },
  },
  ready: function () {
    let t = this,
      ps = getCurrentPages()
    t.setData({
      toHome: '/pages/index/index',
      title: t.data.title || app.globalData.appName
    })

    wx.getSystemInfo({
      success: e => {
        let sH = e.statusBarHeight,
          bH = t.data.custom.bottom + t.data.custom.top - sH
        bH = t.data.custom.bottom * 2 - t.data.custom.height - sH
        bH = bH < t.data.cBarHeight ? t.data.cBarHeight : bH
        ps[ps.length - 1].setData({
          addMiniTop: t.data.custom.top + t.data.custom.height + 10,
          addMiniRight: Math.ceil(3 * t.data.custom.width / 4) - 6
        })
        t.setData({
          cBarHeight: t.data.height || bH,
          cBarTitleTop: t.data.titleTop || sH,
          cBarTitleHeight: t.data.titleHeight || bH,
          cBarTitlePaddingTop: t.data.titlePaddingTop || sH
        })
      }
    })
  },
  methods: {}
});