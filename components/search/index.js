// component/search/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		val: {
			type: String, //类型
			value: "" //默认值
		},
		placeholder: {
			type: String,
			value: "搜索热门关键词",
		},
		isCancel: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		inputValue: ""
	},

	created() {
		this.data.inputValue = this.data.val;
	},

	observers: {
		val(val, newVal) {
			this.setData({
				'inputValue': val
			})
		}
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		bindInput: function (e) {
			this.setData({
				'inputValue': e.detail.value
			},()=>{
				console.log('带参数跳转到搜索结果页面')
			})
		},

		cancel(e) {
			this.setData({
				'inputValue': ''
			}, () => {
				wx.navigateBack({
					delta: -1
				})
			})
		},

		//按了搜索确认按钮后执行的方法
		firm(e) {
			let that = this;
			let val = e.detail.value == undefined ? that.data.codes : e.detail.value; //通过这个传递数据
			let myEventDetail = {
				val: val
			}
			this.triggerEvent('firmInput', myEventDetail) //myevent自定义名称事件，父组件中使/
		},

		search() {
			let val = this.data.inputValue
			let myEventDetail = {
				val: val
			}
			this.triggerEvent('search', myEventDetail) //myevent自定义名称事件，父组件中使/
		},
	}
})