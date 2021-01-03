// pages/mine/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		info:{
			avatar:'/assets/image/icon_shopportrait_44@2x.png',
			name:'',
		},
		orderArr:[
			{
				icon:'/assets/image/icon_grouporder_6_24@2x.png',
				title:'待付款',
				type:'payment',
				link:'/pages/home/index',
				linkType:'navigateTo',
				info:2,
			},
			{
				icon:'/assets/image/icon_grouporder_2_24@2x.png',
				title:'待发货',
				type:'ship',
				link:'/pages/home/index',
				linkType:'navigateTo',
				info:9,
			},
			{
				icon:'/assets/image/icon_grouporder_3_24@2x.png',
				title:'待收货',
				type:'receipt',
				link:'/pages/home/index',
				linkType:'navigateTo',
				info:99,
			},
			{
				icon:'/assets/image/icon_grouporder_4_24@2x.png',
				title:'待评价',
				type:'evaluation',
				link:'/pages/home/index',
				linkType:'navigateTo',
				info:null,
			},
			{
				icon:'/assets/image/icon_grouporder_9_24@2x.png',
				title:'售后',
				type:'afterSale',
				link:'/pages/home/index',
				linkType:'navigateTo',
				info:null,
			}
		],
		linkArr:[
			{
				icon:'/assets/image/icon_comment_20@2x.png',
				title:'消息通知',
				type:'message',
				link:'/pages/home/index',
				linkType:'navigateTo',
			},
			{
				icon:'/assets/image/icon_tickling_20@2x.png',
				title:'用户反馈',
				type:'feedback',
				link:'/pages/home/index',
				linkType:'navigateTo',
			},	{
				icon:'/assets/image/icon_set_20@2x.png',
				title:'设置',
				type:'set',
				link:'/pages/home/index',
				linkType:'navigateTo',
			},
			{
				icon:'/assets/image/icon_outload_20@2x.png',
				title:'退出登录',
				type:'out',
				link:'/pages/home/index',
				linkType:'navigateTo',
			}
		]
	},

	seteleTap(){
		wx.reLaunch({
			url: '/pages/login/index'
		})
	},
	
	toLink(e){
		let item = e.currentTarget.dataset.item;
		console.log(item.linkType)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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