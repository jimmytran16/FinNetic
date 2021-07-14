const homeController = (req, res, next) => {
    return res.json({
        message: 'home route',
        success:true
    })
}

module.exports = homeController;