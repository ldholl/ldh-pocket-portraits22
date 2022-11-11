const router = require('express').Router();
const { Person, Notes } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

router.get('/', (req, res) => {
    Notes.findAll({
        attributes: [
            'id',
            'note_text',
            'person_id'
        ],
        include: [
            {
                model: Person,
                attributes: ['id', 'last_name', 'first_name']
            }
        ]
    })
    .then(dbNotesData => {res.json(dbNotesData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', withAuth, (req, res) => {
    Notes.create({
        note_text: req.body.note_text,
        person_id: req.body.person_id
    })
    .then(dbNotesData => res.json(dbNotesData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Notes.destroy({
        where: { id: req.params.id }
    })
    .then(dbNotesData => {
        if (!dbNotesData) {
            res.status(404).json({ message: 'No note with this id exists' });
        }
        res.json({ message: 'Note deleted' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;