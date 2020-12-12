// components/search/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		searchShow: {
			type: Boolean,
			value: false,
		},
	},

	observers:{
		searchShow: function (val) {
			this.setData({
				show:val
			})
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show: false,
		time:"",
		content:'',
		currentDate: new Date().getTime(),
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`;
			} else if (type === 'day') {
				return `${value}日`;
			} else if (type === 'hour') {
				return `${value}时`;
			} else if (type === 'minute') {
				return `${value}分`;
			}
			return value;
		},
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

		onShow() {
			this.setData({
				show: true
			});
		},

		ClickTimeViewOkBtn(event) {
			let time = this.getTime(event.detail, '{y}-{m}-{d} {h}:{i}');
			// console.log("点击确定 选择的时间 - " + time);
			this.setData({
				currentDate: event.detail,
				time: time
			}, () => {
				this.onClose()
				this.triggerEvent('currentDate',time)
			});
		},

		getTime(time, cFormat) {
			if (arguments.length === 0) {
				return null
			}
			const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
			let date
			if (typeof time === 'object') {} else {
				if (('' + time).length === 10) time = parseInt(time) * 1000
				date = new Date(time)
			}
			const formatObj = {
				y: date.getFullYear(),
				m: date.getMonth() + 1,
				d: date.getDate(),
				h: date.getHours(),
				i: date.getMinutes(),
				s: date.getSeconds(),
				w: date.getDay()
			}
			const time_str = format.replace(/{(y|m|d|h|i|s|w)+}/g, (result, key) => {
				let value = formatObj[key]
				if (key === 'w') {
					return ['日', '一', '二', '三', '四', '五', '六'][value]
				}
				if (result.length > 0 && value < 10) {
					value = '0' + value
				}
				return value || 0;
			})
			return time_str;
		},
	}
})