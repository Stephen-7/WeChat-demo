// components/swiper/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		bannerList: {
			type: Array,
			value: [],
		},
	},

	observers: {
		bannerList: function (val) {
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
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})