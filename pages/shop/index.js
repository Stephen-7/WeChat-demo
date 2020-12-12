Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotalPrice()
  },

  // 选择药品函数
  switchSelect: function (e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let selectNum = 0;
    let totalIndex = 0;
    const isSelect = carts[index].isSelect;
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
    let isAllSelect = this.data.isAllSelect; // 是否全选状态
    isAllSelect = !isAllSelect;
    let carts = this.data.carts;
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

  // 单品删除
  selectDelete(e) {
    // const index = e.currentTarget.dataset.index;
    // let carts = this.data.carts;
    // let quantity = carts[index].count.quantity;
    console.log(e.currentTarget)
    console.log(e)
  },

  // 全选删除
  allDelete(e) {
    let isAllSelect = this.data.isAllSelect; // 是否全选状态
    isAllSelect = !isAllSelect;
    if (!isAllSelect) {
      this.setData({
        carts: [],
        listMessage: true,
        isAllSelect: false,
        totalMoney: 0,
        totalIndex: 0,
      })
    } else {
      console.log('未全选商品！')
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})