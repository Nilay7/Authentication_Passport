module.exports = function(app, passport) {
    app.post('/login',passport.authenticate('local-login', { successRedirect: '/test',
                                   failureRedirect: '/failTest',
                                   failureFlash: false })
            );

    app.post('/signup' ,passport.authenticate('local-signup' , { successRedirect: '/test',
                                    failureRedirect:'/signup',
                                    failureFlash:false})
            ); 

    app.get('/success', isLoggedIn, (req, res) => {
        res.send('Logged in Successfully!', {
            user: req.user
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        req.redirect('/login');
        res.send('Logged-Out Successfully');
    });

    app.get('/test', (req, res) => {
        res.send('its working');
    });

    app.get('/failTest', (req, res) => {
        res.send('its not working');
    });
};

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated())
        return next;
    
        res.redirect('/login');
}

