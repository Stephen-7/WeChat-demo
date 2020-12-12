// components/selectCity/index.js
const {
	provincCityDistrict
} = require('../../request/provinces')
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		cityShow: {
			type: Boolean,
			value: false,
		},
	},

	observers:{
		cityShow: function (val) {
			this.setData({
				show:val
			})
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show:false,
		areaList: provincCityDistrict,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onClose() {
			this.setData({
				show: false
			});
		},

		cancel() {
			this.onClose()
		},

		confirm(e) {
			let name = '';
			if (e.detail.values[1].name.length > 4) {
				name = e.detail.values[1].name.substring(0, 4) + '...'
			} else {
				name = e.detail.values[1].name
			}
			this.setData({
				province: e.detail.values[0].name,
				city: name || '未选择'
			})
			this.triggerEvent("cityValue", e.detail.values);
			this.onClose();
		},
	}
})