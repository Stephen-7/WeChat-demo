// components/citySearch/index.js
const app = getApp()
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		placeholder: {
			type: String,
			value: '搜索热门关键词',
		},
		value: {
			type: String,
			value: '',
		}
	},

	lifetimes: {
		attached: function () {
			// 在组件实例进入页面节点树时执行
			console.log('在组件实例进入页面节点树时执行')
			let city = '';
			if (app.globalData.address) {
				if (app.globalData.address.city.length > 4) {
					city = app.globalData.address.city.substring(0, 4) + '...'
				} else {
					city = app.globalData.address.city
				}
				this.setData({
					city: city,
				})
			}else{
				this.setData({
					city: '未选择',
				})
			}
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
			console.log('在组件实例被从页面节点树移除时执行')
		},
	},
	// 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
	attached: function () {
		// 在组件实例进入页面节点树时执行
		console.log('在组件实例进入页面节点树时执行')
	},
	detached: function () {
		// 在组件实例被从页面节点树移除时执行
		console.log('在组件实例被从页面节点树移除时执行')
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		codes:'',
		cityShow: false,
		city: '',
		value: "",
		name: '',
		placeholder: "",
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		changeCity() {
			this.setData({
				cityShow: true
			});
		},

		getCityValue(e){
			let city = '';
			if (e.detail[1].name.length > 4) {
				city = e.detail[1].name.substring(0, 4) + '...'
			} else {
				city = e.detail[1].name
			}
			this.setData({
				city: city || '未选择'
			},()=>{
				this.triggerEvent("backCityValue", e.detail[1].name);
			})
		},

		searchFor() {
			let type = {
				"city": this.data.city,
				"value": this.data.value
			}
			this.triggerEvent("backSearchValue", type);
		},

		chanheValue(e) {
			this.setData({
				value: e.detail.value
			})
		},

		firm(e) {
      let that = this;
			let val = e.detail.value == undefined ? that.data.codes : e.detail.value; //通过这个传递数据
      let myEventDetail = {
        value: val
      }
      this.triggerEvent('firmInput', myEventDetail) //myevent自定义名称事件，父组件中使/
    },

    search(){
      // let that = this;
      let value = this.data.value
      let myEventDetail = {
        value: value
			}
      this.triggerEvent('search', myEventDetail) //myevent自定义名称事件，父组件中使/
    },
	}
})