// components/address/addressSelect/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		addressSelect: {
			type: Object,
			value: {},
		}
	},

	observers: {
		addressSelect: function (val) {
			this.setData({
				item: val || null
			})
		},
	},


	/**
	 * 组件的初始数据
	 */
	data: {
		item: null,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})