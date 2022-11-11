const router = require('express').Router();
const { Router } = require('express');
const sequelize = require('../config/connection');
const {Person, Notes } = require('../models');

router.get('/', (req, res) => {
    Person.findAll({
        attributes: [
            'id',
            'last_name',
            'first_name'
        ]
    })
    .then(dbPersonData => {
        
        const persons = dbPersonData.map(person => person.get({ plain: true }))
        console.log(persons)
        res.render('homepage', { 
            persons,
            // loggedIn: req.session.loggedIn
         })      
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});


router.get(`/login`, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect(`/`);
        return;
    }

    res.render(`login`);
});




module.exports = router;