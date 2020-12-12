// components/graph/index.js
import uCharts from "../../utils/u-charts.min.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    graph: {
      type: Object,
      value: {},
    }
  },

  observers: {
    graph(val, newVal) {
      if (val) {
        console.log(val, 'val23')
        this.showColumn({
          categories: val.categories,
          series: [{
            name: "房价走势图",
            data: val.seriesData,
            color: "#FFD200",
            show: true,
            area: [0, 50],
          }]
        });
      }
    },
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log('在组件实例进入页面节点树时执行')

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
    cWidth: '',
    cHeight: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showColumn(chartData) {
      let _self = this;
      new uCharts({
        $this: _self,
        canvasId: "canvasColumn",
        type: 'line',
        legend: true,
        fontSize: 11,
        background: '#FFFFFF',
        pixelRatio: 1,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          // disabled:true
        },
        dataLabel: false,
        width: _self.cWidth,
        height: 210,
        extra: {
          column: {
            type: 'group',
            width: _self.cWidth * 0.45 / chartData.categories.length
          }
        }
      });
    },

  }
})