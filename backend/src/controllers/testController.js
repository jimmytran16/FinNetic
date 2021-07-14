const testController = (req, res, next) => {
    return res.json({
        message: 'Test POST endpoint',
        success:true
    })
}

module.exports = testController;