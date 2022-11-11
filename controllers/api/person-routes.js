const router = require('express').Router();
// importing other models yet to be created
const { Person, User, Notes} = require('../../models');
const withAuth = require('../../utils/auth');

// get all people
router.get('/', (req, res) => {
   Person.findAll({
    attributes: [
        'id',
        'last_name',
        'first_name'
    ],
    order: [[`last_name`]],
    include: [
        {
            model: User,
            attributes: [`id`, `username`, `email`],
        },
        {
            model: Notes,
            attributes: [`id`, `note_text`, `person_id`]
        }
    ]
   })
   .then(dbPersonData => res.json(dbPersonData))
   .catch(err => {
        console.log(err);
        res.status(500).json(err);
   });
});

// get one person by id
router.get('/:id', (req, res) => {
    Person.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'last_name',
            'first_name'
        ],
        include: [
            {
                model: User,
                attributes: [`id`, `username`, `email`],
            },
            {
                model: Notes,
                attributes: [`id`, `note_text`, `person_id`]
            }
        ]
    })
    .then(dbPersonData => {
        if(!dbPersonData){
            res.status(404).json({ message: 'Nobody found with this id'});
            return;
        }
        res.json(dbPersonData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// create new person
router.post('/', withAuth, (req, res) => {
    Person.create({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        has_children: req.body.has_children,
        has_pets: req.body.has_pets,
        likes_sports: req.body.likes_sports,
        likes_media: req.body.likes_media,
        // This will associate the person with the user who is logged in
        user_id: req.session.user_id
    })
    .then(dbPersonData => res.json(dbPersonData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

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
 


// delete person by id 
router.delete('/:id', withAuth, (req, res) => {
    Person.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPersonData => {
        if (!dbPersonData) {
            res.status(404).json({ message: 'Nobody found with this id' });
            return;
        }
        res.json({ message: 'Person deleted!' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;