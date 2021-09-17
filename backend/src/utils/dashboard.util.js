'use strict'
const moment = require('moment')

const colors = [
    '#2b6777',
    '#52ab98',
    '#c8d8e4',
    '#f2f2f2',
    '#52ab98',
    '#c8d8e4',
    '#2b6777',
    '#f2f2f2',
    '#52ab98',
    '#2b6777',
    '#c8d8e4',
    '#f2f2f2'
]

const parseAccountDataIntoChartData = (data) => {
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
        labels: labels,
        datasets: [{
            label: 'Balance',
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: dataSet
        }]
    }
}

const parsePaymentDataIntoChartData = (data) => {
    var index = 0;
    var monthMappings = {}

    monthMappings[moment().utc().subtract(5, 'months').startOf('month').toISOString()] = 0;
    monthMappings[moment().utc().subtract(4, 'months').startOf('month').toISOString()] = 1;
    monthMappings[moment().utc().subtract(3, 'months').startOf('month').toISOString()] = 2;
    monthMappings[moment().utc().subtract(2, 'months').startOf('month').toISOString()] = 3;
    monthMappings[moment().utc().subtract(1, 'months').startOf('month').toISOString()] = 4;
    monthMappings[moment().utc().subtract(0, 'months').startOf('month').toISOString()] = 5;

    // last six months (testing data...)
    const labels = []
    const numOfAccounts = data.length
    const datasets = [{
        type: 'line',
        label: 'Average',
        borderColor: '#F5DEB3',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        fill: false,
        data: [0, 0, 0, 0, 0, 0],
    }]
    // get an array of the last 6 months
    for (var i = 5; i >= 0; i--) {
        labels.push(moment().subtract(i, 'months').format('MMMM'))
    }
    for (var i = 0; i < numOfAccounts; i++) {
        datasets.push({
            type: 'bar',
            label: 'Account',
            backgroundColor: colors[index++],
            data: [0, 0, 0, 0, 0, 0],
            borderColor: 'white',
        })
    }
    const template = {
        labels: labels,
        datasets: datasets
    }

    var monthsToPaymentMapping = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    }

    for (var x = 0; x < numOfAccounts; x++) {
        // set accounts to corresponding labels
        template.datasets[x + 1].label = data[x]._id;
        // get payment dates
        let paymentDates = data[x]['paymentDates'];
        // loop through payment dates and assign amount paid to corresponding months
        for (var i = 0; i < paymentDates.length; i++) {
            const amountPaid = paymentDates[i]['amountPaid'];
            const startOfMonth = moment(paymentDates[i]['paymentDate'].toISOString()).utc().startOf('month').toISOString()
            const monthIndex = monthMappings[startOfMonth]

            template.datasets[x + 1].data[monthIndex] += amountPaid;
            monthsToPaymentMapping[monthIndex] = [...monthsToPaymentMapping[monthIndex], amountPaid]
        }
    }

    for (var i = 0; i < 6; i++) {
        // set average
        const sum = monthsToPaymentMapping[i].reduce((a, b) => a + b, 0);
        const avg = (sum / numOfAccounts) || 0;
        template.datasets[0].data[i] = avg;
    }

    return template;
}

const parsePaymentAndAccountDataIntoChartData = (paymentData, accountData) => {
    const templateDataSet = {
        labels: [
            "Remaining Balance",
            "Paid",
        ],
        datasets: [
            {   
                backgroundColor: [
                    "#2b6777",
                    "#52ab98",
                ],
                borderColor: [
                    "#2b6777",
                    "#52ab98",
                ],
                data: [
                    0,
                    0
                ]
            }
        ]
    }
    console.log(paymentData,accountData)
    const sumOfRemaining = accountData.reduce((n, { balance }) => n + balance, 0);
    const sumOfPayments = paymentData.reduce((n, { amountPaid }) => n + amountPaid, 0);
    console.log('sumOfPayments',sumOfPayments)

    templateDataSet.datasets[0].data[0] = sumOfRemaining;
    templateDataSet.datasets[0].data[1] = sumOfPayments;

    return templateDataSet;
}

module.exports = {
    parseAccountDataIntoChartData,
    parsePaymentDataIntoChartData,
    parsePaymentAndAccountDataIntoChartData
}