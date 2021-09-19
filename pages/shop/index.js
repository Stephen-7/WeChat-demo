Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: {
      "top": 0, // 高度
      "title": "购物车", // 标题
      "showBackHome": true, // 左胶囊返回键&&首页键
      "showHome": false, // 左胶囊单首页键
      "showBack": false, // 左胶囊单返回键
      "showBackText": false, // 左胶囊单返回键文字
      "navigateBack": true, // 是否返回navigateBack&&switchTab
      "bgColor": true, // 背景颜色
      "borderColor": true, // borderBottom边框颜色
      "showFixed": false, // 是否浮动
    },
    edit: false,
    isAllSelect: false,
    listMessage: false,
    totalMoney: 0,
    totalIndex: 0,
    carts: [{
        id: 1,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=31a25f2946bb876476efc397929f1d60&imgtype=0&src=http%3A%2F%2Fo4.xiaohongshu.com%2Fdiscovery%2Fw640%2F462ba43540b307990a8b4a2664b9ef20_640_640_92.jpg',
        title: "[马应龙]红霉素软膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 2,
          min: 1,
          max: 20
        }
      },
      {
        id: 2,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=d59a2ae0dad0151c93d252d6478d8007&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140120%2F20140120153321-150550151.jpg',
        title: "[云南]白药牙膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 5,
          min: 1,
          max: 20
        }
      },
      {
        id: 3,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=31a25f2946bb876476efc397929f1d60&imgtype=0&src=http%3A%2F%2Fo4.xiaohongshu.com%2Fdiscovery%2Fw640%2F462ba43540b307990a8b4a2664b9ef20_640_640_92.jpg',
        title: "[马应龙]红霉素软膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 2,
          min: 1,
          max: 20
        }
      },
      {
        id: 4,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=d59a2ae0dad0151c93d252d6478d8007&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140120%2F20140120153321-150550151.jpg',
        title: "[云南]白药牙膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 5,
          min: 1,
          max: 20
        }
      },
      {
        id: 5,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=31a25f2946bb876476efc397929f1d60&imgtype=0&src=http%3A%2F%2Fo4.xiaohongshu.com%2Fdiscovery%2Fw640%2F462ba43540b307990a8b4a2664b9ef20_640_640_92.jpg',
        title: "[马应龙]红霉素软膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 2,
          min: 1,
          max: 20
        }
      },
      {
        id: 6,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=d59a2ae0dad0151c93d252d6478d8007&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140120%2F20140120153321-150550151.jpg',
        title: "[云南]白药牙膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 5,
          min: 1,
          max: 20
        }
      },
      {
        id: 7,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=31a25f2946bb876476efc397929f1d60&imgtype=0&src=http%3A%2F%2Fo4.xiaohongshu.com%2Fdiscovery%2Fw640%2F462ba43540b307990a8b4a2664b9ef20_640_640_92.jpg',
        title: "[马应龙]红霉素软膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 2,
          min: 1,
          max: 20
        }
      },
      {
        id: 8,
        imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545749696672&di=d59a2ae0dad0151c93d252d6478d8007&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140120%2F20140120153321-150550151.jpg',
        title: "[云南]白药牙膏",
        desc: '10g(1%)',
        price: 200,
        isSelect: false,
        count: {
          quantity: 5,
          min: 1,
          max: 20
        }
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotalPrice();
  },

  toEdit() {
    let {
      edit
    } = this.data;
    this.setData({
      edit: !edit
    })
  },

  // 选择商品函数
  switchSelect: function (e) {
    const index = e.currentTarget.dataset.index;
    let {
      carts
    } = this.data;
    let selectNum = 0;
    let totalIndex = 0;
    let isSelect = carts[index].isSelect;
    carts[index].isSelect = !isSelect;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        selectNum++;
        totalIndex += carts[i].count.quantity
      }
    }
    if (selectNum == carts.length) {
      this.setData({
        isAllSelect: true,
      })
    } else {
      this.setData({
        isAllSelect: false,
      })
    }
    this.setData({
      carts: carts,
      totalIndex: totalIndex
    }, () => {
      this.getTotalPrice()
    })
  },

  // 商品增加或减少
  quantityChange(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let totalIndex = 0;
    let quantity = carts[index].count.quantity;
    if (e.target.id == 'sub') {
      if (quantity <= 1) return
      quantity -= 1
    } else if (e.target.id == 'add') {
      quantity += 1;
    }
    carts[index].count.quantity = quantity
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        totalIndex += carts[i].count.quantity
      } else {
        totalIndex += 0
      }
    }
    this.setData({
      carts: carts,
      totalIndex: totalIndex
    }, () => {
      this.getTotalPrice()
    })
  },

  // 计算总价函数
  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        total += carts[i].count.quantity * carts[i].price;
      }
    }
    this.setData({
      carts: carts,
      totalMoney: total.toFixed(2)
    });
  },

  // 商品全选
  selectAll(e) {
    let totalIndex = 0;
    let isAllSelect = e.detail; // 是否全选状态
    let {
      carts,
    } = this.data
    for (let i = 0; i < carts.length; i++) {
      carts[i].isSelect = isAllSelect; // 改变所有商品状态
      if (isAllSelect) {
        totalIndex += carts[i].count.quantity;
      } else {
        totalIndex = 0;
      }
    }
    this.setData({
      isAllSelect: isAllSelect,
      carts: carts,
      totalIndex: totalIndex
    }, () => {
      this.getTotalPrice();
    });
  },

  // 选择删除
  allDelete(e) {
    let {
      carts,
      isAllSelect
    } = this.data; // 是否全选状态
    let arr = carts.filter(item => {
      return item.isSelect === false
    })
    if (isAllSelect) {
      this.setData({
        carts: [],
        edit: false,
        listMessage: true,
        isAllSelect: false,
        totalMoney: 0,
        totalIndex: 0,
      })
    } else if (arr.length !== 0) {
      this.setData({
        carts: arr,
        listMessage: true,
        isAllSelect: false,
        totalMoney: 0,
        totalIndex: 0,
      })
    } else {
      wx.showToast({
        title: '未全选商品！',
        icon: 'none',
      })
    }
  },

  toConfirmOrder() {
    let {
      carts
    } = this.data;
    console.log(carts, 'carts')
    if (carts.length === 0) {
      wx.showToast({
        title: '暂无商品',
        icon: "none",
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideTabBar()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})