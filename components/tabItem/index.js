// components/tabItem/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabList: {
			type: Array,
			value: [],
		},
	},

	observers:{
		tabList: function (val) {
			this.setData({
				item:val
			})
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		item: [],
		active: 1,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onClick(event) {
			this.triggerEvent("tabIndex", event.detail.index);
		},
	}
})