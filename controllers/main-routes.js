const router = require('express').Router();
const { Router } = require('express');
const sequelize = require('../config/connection');
const { Person } = require('../models');


router.post('/', withAuth, (req, res)=> {
    Person.create({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        has_children: req.body.has_children,
        has_pets: req.body.has_pets,
        likes_sports: req.body.likes_sports,
        likes_media: req.body.likes_media,
        user_id: req.session.user_id

    })
    .then(dbPersonData => res.json(dbPersonData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});



module.exports = router;
