// components/bluetoothprinter/index.js
const LAST_CONNECTED_DEVICE = 'last_connected_device'
const PrinterJobs = require('./printer/printerjobs')
const printerUtil = require('./printer/printerutil')

function inArray(arr, key, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][key] === val) {
			return i
		}
	}
	return -1
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
	const hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function (bit) {
			return ('00' + bit.toString(16)).slice(-2)
		}
	)
	return hexArr.join(',')
}

function str2ab(str) {
	// Convert str to ArrayBuff and write to printer
	let buffer = new ArrayBuffer(str.length)
	let dataView = new DataView(buffer)
	for (let i = 0; i < str.length; i++) {
		dataView.setUint8(i, str.charAt(i).charCodeAt(0))
	}
	return buffer;
}


Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		data: {
			type: Array,
			value: [],
		}
	},

	observers: {
		data(val, newVal) {
			console.log(val, 'val23')
		},
	},

	lifetimes: {
		attached: function () {
			// 在组件实例进入页面节点树时执行
			console.log('在组件实例进入页面节点树时执行')
			const lastDevice = wx.getStorageSync(LAST_CONNECTED_DEVICE);
			this.setData({
				lastDevice: lastDevice
			})
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
		showBlue: false,
		devices: [],
		connected: false,
		chs: []
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onClose() {
			this.setData({
				showBlue: false,
			});
		},
		createBLEConnectionWithDeviceId(e) {
			// 小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备
			const device = this.data.lastDevice
			if (!device) {
				return
			}
			const index = device.indexOf(':');
			const name = device.substring(0, index);
			const deviceId = device.substring(index + 1, device.length);
			console.log('createBLEConnectionWithDeviceId', name + ':' + deviceId)
			wx.openBluetoothAdapter({
				success: (res) => {
					console.log('openBluetoothAdapter success', res)
					this._createBLEConnection(deviceId, name)
				},
				fail: (res) => {
					console.log('openBluetoothAdapter fail', res)
					if (res.errCode === 10001) {
						wx.showModal({
							title: '错误',
							content: '未找到蓝牙设备, 请打开蓝牙后重试。',
							showCancel: false
						})
						wx.onBluetoothAdapterStateChange((res) => {
							console.log('onBluetoothAdapterStateChange', res)
							if (res.available) {
								// 取消监听
								wx.onBluetoothAdapterStateChange(() => {});
								this._createBLEConnection(deviceId, name)
							}
						})
					}
				}
			})
		},
		onUnload() {
			this.closeBluetoothAdapter()
		},
		openBluetoothAdapter() {
			console.log('来到这里？？？')
			if (!wx.openBluetoothAdapter) {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
				return
			}
			wx.openBluetoothAdapter({
				success: (res) => {
					this.setData({
						showBlue: true
					}, () => {
						console.log('openBluetoothAdapter success', res)
						this.startBluetoothDevicesDiscovery()
					})
				},
				fail: (res) => {
					console.log('openBluetoothAdapter fail', res)
					if (res.errCode === 10001) {
						wx.showModal({
							title: '错误',
							content: '未找到蓝牙设备, 请打开蓝牙后重试。',
							showCancel: false
						})
						wx.onBluetoothAdapterStateChange((res) => {
							console.log('onBluetoothAdapterStateChange', res)
							if (res.available) {
								// 取消监听，否则stopBluetoothDevicesDiscovery后仍会继续触发onBluetoothAdapterStateChange，
								// 导致再次调用startBluetoothDevicesDiscovery
								wx.onBluetoothAdapterStateChange(() => {});
								this.startBluetoothDevicesDiscovery()
							}
						})
					}
				}
			})
			wx.onBLEConnectionStateChange((res) => {
				// 该方法回调中可以用于处理连接意外断开等异常情况
				console.log('onBLEConnectionStateChange', `device ${res.deviceId} state has changed, connected: ${res.connected}`)
				this.setData({
					connected: res.connected
				})
				if (!res.connected) {
					wx.showModal({
						title: '错误',
						content: '蓝牙连接已断开',
						showCancel: false
					})
				}
			});
		},
		getBluetoothAdapterState() {
			wx.getBluetoothAdapterState({
				success: (res) => {
					console.log('getBluetoothAdapterState', res)
					if (res.discovering) {
						this.onBluetoothDeviceFound()
					} else if (res.available) {
						this.startBluetoothDevicesDiscovery()
					}
				}
			})
		},
		startBluetoothDevicesDiscovery() {
			if (this._discoveryStarted) {
				return
			}
			this._discoveryStarted = true
			wx.startBluetoothDevicesDiscovery({
				success: (res) => {
					console.log('startBluetoothDevicesDiscovery success', res)
					this.onBluetoothDeviceFound()
				},
				fail: (res) => {
					console.log('startBluetoothDevicesDiscovery fail', res)
				}
			})
		},
		stopBluetoothDevicesDiscovery() {
			wx.stopBluetoothDevicesDiscovery({
				complete: () => {
					console.log('stopBluetoothDevicesDiscovery')
					this._discoveryStarted = false
				}
			})
		},
		onBluetoothDeviceFound() {
			wx.onBluetoothDeviceFound((res) => {
				res.devices.forEach(device => {
					if (!device.name && !device.localName) {
						return
					}
					const foundDevices = this.data.devices
					const idx = inArray(foundDevices, 'deviceId', device.deviceId)
					const data = {}
					if (idx === -1) {
						data[`devices[${foundDevices.length}]`] = device
					} else {
						data[`devices[${idx}]`] = device
					}
					this.setData(data)
				})
			})
		},
		createBLEConnection(e) {
			const ds = e.currentTarget.dataset
			const deviceId = ds.deviceId
			const name = ds.name
			console.log(deviceId, name,'createBLEConnection')
			this.setData({
				showBlue: false
			}, () => {
				this._createBLEConnection(deviceId, name)
			})
		},
		_createBLEConnection(deviceId, name) {
			console.log(deviceId, name)
			wx.showLoading({
				title: '加载中',
			})
			wx.createBLEConnection({
				deviceId,
				success: () => {
					console.log('createBLEConnection success');
					this.setData({
						connected: true,
						name,
						deviceId,
					})
					this.getBLEDeviceServices(deviceId)
					wx.setStorage({
						key: LAST_CONNECTED_DEVICE,
						data: name + ':' + deviceId
					})
				},
				complete() {
					wx.hideLoading()
				},
				fail: (res) => {
					console.log('createBLEConnection fail', res)
				}
			})
			this.stopBluetoothDevicesDiscovery()
		},
		closeBLEConnection() {
			wx.closeBLEConnection({
				deviceId: this.data.deviceId
			})
			this.setData({
				connected: false,
				chs: [],
				canWrite: false,
			})
		},
		getBLEDeviceServices(deviceId) {
			wx.getBLEDeviceServices({
				deviceId,
				success: (res) => {
					console.log('getBLEDeviceServices', res)
					for (let i = 0; i < res.services.length; i++) {
						if (res.services[i].isPrimary) {
							this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
							return
						}
					}
				}
			})
		},
		getBLEDeviceCharacteristics(deviceId, serviceId) {
			wx.getBLEDeviceCharacteristics({
				deviceId,
				serviceId,
				success: (res) => {
					console.log('getBLEDeviceCharacteristics success', res.characteristics)
					// 这里会存在特征值是支持write，写入成功但是没有任何反应的情况
					// 只能一个个去试
					for (let i = 0; i < res.characteristics.length; i++) {
						const item = res.characteristics[i]
						if (item.properties.write) {
							this.setData({
								canWrite: true
							})
							this._deviceId = deviceId
							this._serviceId = serviceId
							this._characteristicId = item.uuid
							break;
						}
					}
				},
				fail(res) {
					console.error('getBLEDeviceCharacteristics', res)
				}
			})
		},
		writeBLECharacteristicValue() {
			let printerJobs = new PrinterJobs();
			printerJobs
				.print('2020年10月26日16:05:40')
				.print(printerUtil.fillLine())
				.setAlign('ct')
				.setSize(2, 2)
				.print('#贝如科技外卖')
				.setSize(1, 1)
				.print('汉溪长隆店')
				.setSize(2, 2)
				.print('在线支付(已支付)')
				.setSize(1, 1)
				.print('订单号：5415221202244734')
				.print('下单时间：2020年10月26日15:45:30')
				.setAlign('lt')
				.print(printerUtil.fillAround('生鲜档口'))
				.print(printerUtil.inline('菠菜 * 2斤', '15'))
				.print(printerUtil.inline('大闸蟹 * 5只', '50'))
				.print(printerUtil.inline('荔枝 * 1000克', '15'))
				.print(printerUtil.inline('黑山羊排 * 3斤', '50'))
				.print(printerUtil.inline('蒜苗 * 3根', '1.5'))
				.print(printerUtil.inline('樱桃 * 2斤', '20'))
				.print(printerUtil.inline('走地鸡 * 6斤', '100'))
				.print(printerUtil.inline('雪花牛排 * 4块', '160'))
				.print(printerUtil.inline('菠菜 * 2斤', '15'))
				.print(printerUtil.inline('大闸蟹 * 5只', '50'))
				.print(printerUtil.inline('荔枝 * 1000克', '15'))
				.print(printerUtil.inline('黑山羊排 * 3斤', '50'))
				.print(printerUtil.inline('蒜苗 * 3根', '1.5'))
				.print(printerUtil.inline('樱桃 * 2斤', '20'))
				.print(printerUtil.inline('走地鸡 * 6斤', '100'))
				.print(printerUtil.inline('雪花牛排 * 4块', '160'))
				.print(printerUtil.inline('菠菜 * 2斤', '15'))
				.print(printerUtil.inline('大闸蟹 * 5只', '50'))
				.print(printerUtil.inline('荔枝 * 1000克', '15'))
				.print(printerUtil.inline('黑山羊排 * 3斤', '50'))
				.print(printerUtil.inline('蒜苗 * 3根', '1.5'))
				.print(printerUtil.inline('樱桃 * 2斤', '20'))
				.print(printerUtil.inline('走地鸡 * 6斤', '100'))
				.print(printerUtil.inline('雪花牛排 * 4块', '160'))
				.print(printerUtil.fillAround('其他'))
				.print('包装费：3')
				.print('[赠送可回收绿色环保袋] * 2')
				.print(printerUtil.fillLine())
				.setAlign('rt')
				.print('原价：￥1237.5')
				.print('总价：￥1237.5')
				.setAlign('lt')
				.print(printerUtil.fillLine())
				.print('备注')
				.print("尽快送货上门，保证食材新鲜度~")
				.print(printerUtil.fillLine())
				.println();

			let buffer = printerJobs.buffer();
			console.log('ArrayBuffer', 'length: ' + buffer.byteLength, ' hex: ' + ab2hex(buffer));
			// 1.并行调用多次会存在写失败的可能性
			// 2.建议每次写入不超过20字节
			// 分包处理，延时调用
			const maxChunk = 20;
			const delay = 20;
			for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
				let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
				setTimeout(this._writeBLECharacteristicValue, j * delay, subPackage);
			}
		},
		
		_writeBLECharacteristicValue(buffer) {
			wx.writeBLECharacteristicValue({
				deviceId: this._deviceId,
				serviceId: this._serviceId,
				characteristicId: this._characteristicId,
				value: buffer,
				success(res) {
					console.log('writeBLECharacteristicValue success', res)
				},
				fail(res) {
					console.log('writeBLECharacteristicValue fail', res)
				}
			})
		},
		_writeBLECharacteristicValue(buffer) {
			wx.writeBLECharacteristicValue({
				deviceId: this._deviceId,
				serviceId: this._serviceId,
				characteristicId: this._characteristicId,
				value: buffer,
				success(res) {
					console.log('writeBLECharacteristicValue success', res)
				},
				fail(res) {
					console.log('writeBLECharacteristicValue fail', res)
				}
			})
		},
		closeBluetoothAdapter() {
			wx.closeBluetoothAdapter()
			this._discoveryStarted = false
		},
	}
})