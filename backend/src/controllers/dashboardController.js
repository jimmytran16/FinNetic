const getDashboardContentController = (req, res, next) => {
    // get mock data for grid
    const data = require('./mockdata')

    return res.json({
        data: data,
        message: 'getDashboardContentController route',
        success:true
    })
}

const postBillingDetailsController = (req, res, next) => {
    console.log(req.body.name);
    
    return res.json({
        message: 'postBillingDetailsController route',
        success:true
    })
}


module.exports = { getDashboardContentController,postBillingDetailsController };