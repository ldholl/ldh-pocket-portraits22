const router = require('express').Router();
const { User, Person } = require('../../models');
const withAuth = require (`../../utils/auth.js`)

// get all user
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// get user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Person,
                attributes: ['id', 'last_name', 'first_name']
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });     
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

// create user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({dbUserData, message: 'User account created! You are now logged in!'});
        });  
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: `No user with that email address!` });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: `Incorrect password!` });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.json({ dbUserData, message: `You are now logged in!` });
        });
    });
});

// logout
router.post(`/logout`, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.json({ message: `You are now logged out`}).status(204).end();
        });
    }
    else {
        console.log(`
        ===============
        You can't log out if you're not logged in
        ===============`);
        res.status(404).end();
    }
});

// update user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            // Ensures the only updated user is whoever is logged in
            id: req.session.user_id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json({dbUserData, message: 'User info updated'});
      })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// delete user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            // Ensures the only deleted user is whoever is logged in if they so choose to
            id: req.session.user_id
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        // Not necessary for project right now but needs to delete/log out of session once a user deletes themselves from app
        // After user deletion, Insomnia still acts as there is a session active
        res.json({dbUserData, message: 'User deleted'})
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err);
      });
});

module.exports = router;