// components/address/addressList/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		addressList: {
			type: Array,
			value: [],
		}
	},

	observers: {
		addressList: function (val) {
			this.setData({
				list: val || []
			})
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		list: [],
		checked: false
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onChange(e) {
			let list = this.data.list;
			let item = e.currentTarget.dataset.item;
			let index = e.currentTarget.dataset.index;
			list.map((item)=>{
				item.checked = false
			})
			list[index].checked = !list[index].checked
			this.setData({
				list:list
			},()=>{
				this.triggerEvent("backCheckAddress",item);
			})
		},

		delete(e) {
			let _this = this;
			let item = e.currentTarget.dataset.item;
			wx.showModal({
				title: '地址列表',
				content: '是否删除该地址？',
				showCancel: true,
				cancelText: "取消",
				confirmText: "确定",
				success: function (res) {
					if (res.cancel) {
						//点击取消,默认隐藏弹框
						console.log('取消')
					} else {
						//点击确定
						console.log('确定')
						_this.triggerEvent("backDeleteAddress",item);
					}
				},
			})
		},

		toAddress(e){
			console.log(e)
			let item = e.currentTarget.dataset.item;
			this.triggerEvent("backEditAddress",item);
			// wx.navigateTo({
			// 	url: `/components/address/addressForm/index?item=${item}`,
			// })
		}
	}
})