const { Person } = require('../models');

const personData = [
    {
        last_name: 'Olafson',
        first_name: 'Freyja',
        has_children: 0,
        has_pets: 1,
        likes_sports: 0,
        user_id: 1

    },
    {
        last_name: 'Abbia',
        first_name: 'Noctis',
        has_children: 1,
        has_pets: 1,
        likes_sports: 1,
        likes_media: 1,
        user_id: 2
    },
    {
        last_name: 'Pratnicki',
        first_name: 'Charles',
        user_id: 3
    }
];

const seedPeople = () => Person.bulkCreate(personData);
module.exports = seedPeople;