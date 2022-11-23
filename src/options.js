const helperFunc = require("./helper")
const { data } = require("./data")
const { typeAvgEnum } = require("./constant")

const dataSplit = helperFunc.splitData(data)
const upColor = "#00da3c"
const upBorderColor = "#008F28"
const downColor = "#ec0000"
const downBorderColor = "#8A0000"
const arrayName = [
  "SSG",
  typeAvgEnum.fiveDays,
  typeAvgEnum.tenDays,
  typeAvgEnum.twentyDays,
  typeAvgEnum.volume
]

console.log("dataSplit", dataSplit)
export const options = {
  title: {
    text: "E-Chart",
    left: 0
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross"
    }
  },
  legend: {
    data: arrayName
  },
  grid: {
    left: "10%",
    right: "10%",
    bottom: "15%"
  },
  xAxis: {
    type: "category",
    data: dataSplit.categoryData,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    min: "dataMin",
    max: "dataMax"
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: "inside",
      start: 50,
      end: 100
    },
    {
      show: true,
      type: "slider",
      top: "90%",
      start: 50,
      end: 100
    }
  ],
  series: [
    {
      name: arrayName[0],
      type: "candlestick",
      data: dataSplit.values,
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor
      },
      markPoint: {
        label: {
          formatter: function (param) {
            return param != null ? Math.round(param.value) + "" : ""
          }
        },
        data: [
          {
            name: "Mark",
            coord: ["2013/5/31", 2300],
            value: 2300,
            itemStyle: {
              color: "rgb(41,60,85)"
            }
          },
          {
            name: "highest value",
            type: "max",
            valueDim: "highest"
          },
          {
            name: "lowest value",
            type: "min",
            valueDim: "lowest"
          }
        ],
        tooltip: {
          formatter: function (param) {
            return param.name + "<br>" + (param.data.coord || "")
          }
        }
      },
      markLine: {
        symbol: ["none", "none"],
        data: [
          [
            {
              name: "from lowest to highest",
              type: "min",
              valueDim: "lowest",
              symbol: "circle",
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            {
              type: "max",
              valueDim: "highest",
              symbol: "circle",
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          ],
          {
            name: "min line on close",
            type: "min",
            valueDim: "close"
          },
          {
            name: "max line on close",
            type: "max",
            valueDim: "close"
          }
        ]
      }
    },
    {
      name: arrayName[1],
      type: "line",
      data: helperFunc.getDataAvg(dataSplit, typeAvgEnum.fiveDays),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: arrayName[2],
      type: "line",
      data: helperFunc.getDataAvg(dataSplit, typeAvgEnum.tenDays),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: arrayName[3],
      type: "line",
      data: helperFunc.getDataAvg(dataSplit, typeAvgEnum.twentyDays),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: arrayName[4],
      type: "dot",
      data: helperFunc.getDataAvg(dataSplit, typeAvgEnum.volume),
      smooth: true
      // lineStyle: {
      //   opacity: 0.5
      // }
    }
  ]
}
