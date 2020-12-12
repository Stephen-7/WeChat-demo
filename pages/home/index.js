// pages/home/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nav: {
			"top": 0, // 高度
			"title": "测试小程序", // 标题
			"showBackHome": true, // 左胶囊返回键&&首页键
			"showHome": false, // 左胶囊单首页键
			"showBack": false, // 左胶囊单返回键
			"showBackText": false, // 左胶囊单返回键文字
			"navigateBack": false, // 是否返回navigateBack&&switchTab
			"bgColor": true, // 背景颜色
			"borderColor": true, // borderBottom边框颜色
			"showFixed": false, // 是否浮动
		},

		src: '',
		width: 250, //宽度
		height: 250, //高度
		searchShow: false,
		cityShow: false,
		tabList: ['1页', '2页', '3页', '4页', '5页', '6页', '7页', '8页', '9页'],
		bannerList: [],
		videoList: [],
		addressSelect: {
			"name": "Stephen",
			"phone": "176****5317",
			"address": "广东省广州市汉溪大道北时代E-pink2506",
		},
		addressForm: {
			"id": 1,
			"name": "Stephen",
			"phone": 17620835317,
			"area": "广东省/广州市/番禺区",
			"address": "汉溪大道北时代E-pink2506",
			"checked": true
		},
		addressList: [{
				"id": 1,
				"name": "Stephen1",
				"phone": "176****5317",
				"checked": true,
				"address": "广东省广州市汉溪大道北时代E-pink2506",
			},
			{
				"id": 2,
				"name": "Stephen2",
				"phone": "176****5317",
				"checked": false,
				"address": "广东省广州市汉溪大道北时代E-pink2506",
			},
			{
				"id": 3,
				"name": "吴加良3",
				"phone": "176****5317",
				"checked": false,
				"address": "广东省广州市汉溪大道北时代E-pink2506",
			},
		],

		graph: {
      categories: ['2500', '2700'],
      seriesData: ['11-05', '11-07']
    },
	},

	showLoading: function () {
		wx.showNavigationBarLoading({
			complete() {
				console.log('showNavigationBarLoading')
			}
		})
	},
	hideLoading: function () {
		wx.hideNavigationBarLoading({
			complete() {
				console.log('hideNavigationBarLoading')
			}
		})
	},

	checkIng() {
		this.setData({
			cityShow: true,
		})
	},

	getCurrentDate(e) {
		console.log(e.detail)
	},

	getCityValue(e) {
		console.log(e.detail)
	},

	getTabIndex(e) {
		console.log(e.detail)
	},

	getScrollTop(e) {
		console.log(e.detail)
	},

	getCityValue(e) {
		console.log(e.detail)
	},

	getSearchValue(e) {
		console.log(e.detail)
	},

	chooseAddress() {
		wx.chooseAddress({
			success: (res) => {
				console.log(res, 'info')
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	getCheckAddress(e) {
		console.log(e.detail)
	},

	getDeleteAddress(e) {
		console.log(e.detail)
	},

	getEditAddress(e) {
		console.log(e.detail)
	},

	getFormAddress(e) {
		console.log(e.detail)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.cropper = this.selectComponent("#image-cropper");
		//开始裁剪
		// this.setData({
		// 	src: "https://raw.githubusercontent.com/1977474741/image-cropper/dev/image/code.jpg",
		// });
		// wx.showLoading({
		// 	title: '加载中'
		// })
	},

	cropperload(e) {
		console.log("cropper初始化完成");
	},

	loadimage(e) {
		console.log("图片加载完成", e.detail);
		wx.hideLoading();
		//重置图片角度、缩放、位置
		this.cropper.imgReset();
	},

	clickcut(e) {
		console.log(e.detail);
		//点击裁剪框阅览图片
		wx.previewImage({
			current: e.detail.url, // 当前显示图片的http链接
			urls: [e.detail.url] // 需要预览的图片http链接列表
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