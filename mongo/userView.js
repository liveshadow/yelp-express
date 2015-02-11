module.exports = function(app) {

    app.get('/view/user/:user_id', function(req, res) {

        // get the business collection
        var user = app.db.get('user')

         var q = {
            'user_id': req.params.user_id            
        }

        var user = user.findOne(q, function(err, item) {

            res.render('viewUser.jade', {
                user: item
            })
        })

    })
}