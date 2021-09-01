const parseAccountDataIntoChartData = (data) => {
    const colors = [
        '#2b6777', 
        '#52ab98',
        '#c8d8e4', 
        '#f2f2f2', 
        '#2b6777', 
        '#52ab98',
        '#c8d8e4', 
        '#f2f2f2',
        '#2b6777', 
        '#52ab98',
        '#c8d8e4', 
        '#f2f2f2' 
        // '#ffffff',
    ]
    const labels = []
    const backgroundColor = []
    const dataSet = []
    const borderColor = []
    var index = 0;
    for (var i in data) {
        labels.push(data[i].name)
        backgroundColor.push(colors[index])
        borderColor.push(colors[index++])
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