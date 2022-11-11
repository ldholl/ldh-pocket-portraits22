const router = require('express').Router();
const { Router } = require('express');
const sequelize = require('../config/connection');
const { Person, Notes } = require('../models');

router.get('/:id', (req, res) => {
    Person.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'last_name',
            'first_name',
            'has_children',
            'has_pets',
            'likes_sports',
            'likes_media'
        ],
        include: [
            {
                model: Notes,
                attributes: ['id', 'note_text', 'person_id']
            }
        ]
    })
    .then(dbPersonData => {
        res.render('profile', dbPersonData.get({ plain: true }));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// EDIT ID
router.put('/:id', (req, res) => {
    Person.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPersonData => {
        if(!dbPersonData[0]){
            res.status(404).json({message: 'No profile found with this id'});
            return;
        }
        res.json(dbPersonData);
    })
    .catch(err => {
        console.log(err);
        res.status(500)
    })
})
 
//ADD NOTE
router.post('/', (req, res) => {
    Notes.create({
        note_text: req.body.note_text,
        person_id: req.body.person_id
    })
    .then(dbNoteData => res.json(dbNoteData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    })
})



module.exports = router;