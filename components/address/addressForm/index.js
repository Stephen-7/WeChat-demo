// components/address/addressForm/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		addressForm: {
			type: Object,
			value: {}
		}
	},

	observers: {
		addressForm: function (val) {
			this.setData({
				id: val.id,
				name: val.name,
				phone: val.phone,
				area: val.area,
				address: val.address,
				checked: val.checked,
				carryOut: true,
			})
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		id: "",
		name: "",
		phone: "",
		area: "",
		address: "",
		cityShow: false,
		checked: false,
		carryOut: false,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTypes(e) {
			if (e.detail.value) {
				this.setData({
					carryOut: true,
					[`${e.currentTarget.dataset.model}`]: e.detail.value,
				});
			} else {
				this.setData({
					carryOut: false,
					[`${e.currentTarget.dataset.model}`]: e.detail.value,
				});
			}
		},

		showPopup(e) {
			this.setData({
				cityShow: true
			})
		},

		getCityValue(e) {
			let area = e.detail[0].name + '/' + e.detail[1].name + '/' + e.detail[2].name
			this.setData({
				area: area
			})
		},

		onChange({
			detail
		}) {
			this.setData({
				checked: detail
			});
		},

		submit() {
			let {
				id,
				name,
				phone,
				area,
				address,
				checked,
			} = this.data;
			if (name === "" || phone === "" || area === "" || address === "") {
				wx.showToast({
					title: '请完善数据',
					icon: 'none',
					duration: 2500
				})
			} else {
				this.triggerEvent("backFormAddress", {
					id:id,
					name: name,
					phone: phone,
					area: area,
					address: address,
					checked: checked,
				});
			}
		},
	}
})