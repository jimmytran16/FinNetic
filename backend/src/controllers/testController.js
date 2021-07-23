const testController = (req, res, next) => {
    
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'Decmeber'
    ];
    
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45,344,32,32,32,32],
        }]
    };


    return res.json({
        message: 'Test POST endpoint',
        data: data,
        success:true
    })
}

module.exports = testController;