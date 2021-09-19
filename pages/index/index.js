// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    miao: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 在进入页面时开始执行定时器，每秒执行一次miao-1操作。
    that.time = setInterval(function () {
      that.setData({
        miao: that.data.miao - 1
      })

      // 当miao==0时，清除定时器clearInterval(this.time)（一定要清除定时器），然后自动跳转到首页
      if (that.data.miao == 0) {
        clearInterval(that.time);
        wx.switchTab({
          url: "/pages/mine/index",
        })
      }
    }, 1000)
  },

  cliadv() {
    clearInterval(this.time)
    wx.switchTab({
      url: "/pages/mine/index",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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