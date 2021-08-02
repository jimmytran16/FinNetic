const parseAccountDataIntoChartData = (data) => {
    const colors = ['#E55C20','#e70000','#c5c9c7','#00965e','rgb(116, 219, 191)']
    const labels = []
    const backgroundColor = []
    const dataSet = []
    const borderColor = []

    for (var i in data) {
        var randomIndex = colors.length * Math.random() | 0;
        labels.push(data[i].name)
        backgroundColor.push(colors[randomIndex])
        borderColor.push(colors[randomIndex])
        dataSet.push(data[i].balance)
    }
    
    return {
        labels:labels,
        datasets: [{
            label:'Balance',
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: dataSet
        }]
    }
}

module.exports = {
    parseAccountDataIntoChartData
}