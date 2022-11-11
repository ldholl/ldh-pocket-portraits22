const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        console.log(`
        ================
        You need to be logged in to do this action
        ================`)
        res.redirect(`/login`); // PLACE HOLDER REDIRECT; CAN BE CHANGED TO WHEREVER WE WANT NON LOGGED IN USERS TO GO
    }
    else {
        console.log(`
        ================
        Authentication passed: user currently logged in and completed action
        ================`)
        next();
    }
}

module.exports = withAuth;