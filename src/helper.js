const { typeAvgEnum } = require("./constant")

export const calculateMA = (data, dayCount) => {
  var result = []
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-")
      continue
    }
    var sum = 0
    for (var j = 0; j < dayCount; j++) {
      sum += +data.values[i - j][1]
    }
    result.push(sum / dayCount)
  }
  return result
}

export const getDataAvg = (data, typeAvg) => {
  console.log("data", data)
  console.log("typeAvg", typeAvg)
  const result = []

  for (var i = 0, len = data.values.length; i < len; i++) {
    let positionData = 0
    switch (typeAvg) {
      case typeAvgEnum.fiveDays:
        positionData = data.values[i][4]
        break
      case typeAvgEnum.tenDays:
        positionData = data.values[i][5]
        break
      case typeAvgEnum.twentyDays:
        positionData = data.values[i][6]
        break
      case typeAvgEnum.volume:
        positionData = data.values[i][7]
        break
      default:
        break
    }
    result.push(positionData)
  }

  // var result = []
  // for (var i = 0, len = data.values.length; i < len; i++) {
  //   if (i < dayCount) {
  //     result.push("-")
  //     continue
  //   }
  //   var sum = 0
  //   for (var j = 0; j < dayCount; j++) {
  //     sum += +data.values[i - j][1]
  //   }
  //   result.push(sum / dayCount)
  // }
  console.log("result", result)
  return result
}

export const splitData = (rawData) => {
  const categoryData = []
  const values = []
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
  }
  return {
    categoryData: categoryData,
    values: values
  }
}
