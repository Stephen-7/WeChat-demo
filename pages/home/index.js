// pages/home/index.js
var qqSDK = require('../../utils/qqmap-wx-jssdk')
const provinces = require('../../request/provinces');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nav: {
			"top": 0, // 高度
			"title": "测试小程序", // 标题
			"showBackHome": false, // 左胶囊返回键&&首页键
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
		bannerList: [1, 1, 1, 1],
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
				"name": "Stephen3",
				"phone": "176****5317",
				"checked": false,
				"address": "广东省广州市汉溪大道北时代E-pink2506",
			},
			{
				"id": 4,
				"name": "Stephen4",
				"phone": "176****5317",
				"checked": false,
				"address": "广东省广州市汉溪大道北时代E-pink2506",
			},
			{
				"id": 5,
				"name": "Stephen5",
				"phone": "176****5317",
				"checked": false,
				"address": "广东省广州市汉溪大道北时代E-pink2506",
			},
		],
		indexData: [],
		graph: {
			categories: ['2500', '2700'],
			seriesData: ['11-05', '11-07']
		},

		latitude: "",
		longitude: "",
	},

	select() {
		let data = [];
		let city = provinces.provincCityDistrict.city_list;
		for (let k in city) {
			data.push(city[k])
		};
		console.log(this.fixTheSearchTeachers(data))
		this.setData({
			indexData: this.fixTheSearchTeachers(data)
		})
	},

	fixTheSearchTeachers(names) {
		var data = names;
		data.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {
			sensitivity: 'accent'
		}));
		var compareStr = ["吧", "擦", "搭", "妸", "发", "旮", "哈", "击", "咖", "垃", "妈", "那", "噢", "葩", "妻", "燃", "仨", "它", "挖", "夕", "匝"];
		var UpperCode = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "W", "X", "Z"];
		var temp = [],
			newData = [];
		for (var j = 0, i = 0; i < data.length;) {
			if (data[i].localeCompare(compareStr[j], 'zh-Hans-CN', {
					sensitivity: 'base'
				}) <= 0) {
				temp.push(data[i]);
				i++;
			} else if (temp.length > 0) {
				// temp.unshift(UpperCode[j]);
				// newData.push(temp);
				newData.push({
					index: UpperCode[j],
					data: temp
				});
				temp = [];
				j++;
			} else {
				j++;
			}
		}
		return newData;
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

	mapNavigation() {
		var that = this;
		var qqMap = new qqSDK({
			key: 'XRUBZ-XN6KX-IYQ4H-7XZUT-AZWLJ-4PBIA'
		})
		qqMap.geocoder({
			address: {latitude: 23.001009,latitude:113.33966},
			success: function (res) {
				var local = res.result.location;
				that.setData({
					latitude: local.lat,
					longitude: local.lng
				})
			},
		})
		// 使用微信内置地图查看位置
		wx.getLocation({
			type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			success: function (res) {
				wx.openLocation({
					latitude: res.latitude,
					longitude: res.longitude,
					scale: 28,
					name: "番禺时代", //打开后显示的地址名称
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	// onLoad: function (options) {
		// this.select()
		// this.cropper = this.selectComponent("#image-cropper");
		//开始裁剪
		// this.setData({
		// 	src: "https://raw.githubusercontent.com/1977474741/image-cropper/dev/image/code.jpg",
		// });
		// wx.showLoading({
		// 	title: '加载中'
		// })
	// },


// onLoad:function(){
// 	this.getSetting()
// },

// //获取定位
// //判断是否获得了用户地理位置授权
// getSetting: function() {
// 	let that = this;
// 	wx.getSetting({
// 			success: (res) => {
// 					// 查看位置权限的状态 如果是首次授权(undefined)或者之前拒绝授权(false)            
// 					//!res.authSetting['scope.userLocation']
// 					if (res.authSetting['scope.userLocation'] == false) {
// 							//之前拒绝授权(false)
// 							that.openConfirm()
// 					} else {
// 							//如果是首次授权则弹出授权窗口进行授权，如果之前进行了授权，则获取地理位置信息
// 							that.getLocation()
// 					}
// 			}
// 	})
// },

// openConfirm: function() {
// 	let that = this;
// 	wx.showModal({
// 			content: '检测到您没打开定位权限，是否去设置打开？',
// 			confirmText: "确认",
// 			cancelText: "取消",
// 			success: function(res) {
// 					console.log(res);
// 					//点击“确认”时打开设置页面
// 					if (res.confirm) {
// 							console.log('用户点击确认')
// 							wx.openSetting({
// 									success: (res) => {
// 											that.getLocation()
// 									}
// 							})
// 					} else {
// 							console.log('用户点击取消')
// 					}
// 			}
// 	});
// },

// getLocation: function() {
// 	let that = this;
// 	wx.getLocation({
// 			type: 'gcj02',
// 			altitude: true,
// 			success: function(res) {
// 				console.log(res,'res')
// 			},
// 			fail: function(res) {
// 				 console.log("---未授权---");
// 				 wx.openSetting({})
// 			},
// 			complete: function(res) {},
// 	})
// },




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