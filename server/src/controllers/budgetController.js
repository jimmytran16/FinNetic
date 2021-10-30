
const getBudgetBreakdown = (req, res, next) => {

    const options = {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }

    const arbitraryStackKey = "stack1";
    // mock data
    const data = {
        labels: ['Week of 01/01', 'Week of 01/08', 'Week of 01/13', 'Week of 01/20', 'Week of 01/27'],
        datasets: [
            // These two will be in the same stack.
            {
                stack: arbitraryStackKey,
                backgroundColor: ['#f2f2f2'],
                label: 'Food',
                data: [1, 2, 3, 4, 5],
            },
            {
                stack: arbitraryStackKey,
                backgroundColor: ['#c8d8e4'],
                label: 'Others',
                data: [5, 4, 3, 2, 1]
            },
            {
                stack: arbitraryStackKey,
                backgroundColor: ['#52ab98'],
                label: 'Remaining',
                data: [5, 4, 3, 2, 1]
            }
        ]
    }

    const result = {
        options : options,
        data : data
    }

    return res.json({
        success: true,
        data: result
    })
}


module.exports = {
    getBudgetBreakdown
}