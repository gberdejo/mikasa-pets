const existsSession = (req, res, next) => {
    if (typeof req.session.usersession !== 'undefined') {
        return res.render('home', {
            usersession: req.session.usersession
        })
    }
    next();
}
module.exports = {
    existsSession
}