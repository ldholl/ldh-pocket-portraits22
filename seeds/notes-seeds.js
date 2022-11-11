const { Notes }= require('../models');

const notesData = [
    {
        note_text: "Will only drink water out of a glass instead of the nice fountain that his parents bought him",
        person_id: 2
    },
    {
        note_text: "Once fell into a dead sleep in the lining of the living room couch, leading her mom to think that she had escaped the apartment",
        person_id: 1
    },
    {
        note_text: "Doesn't seem to know how to meow, only chirp",
        person_id: 2
    },
    {
        note_text: "Doesn't like tuna :(",
        person_id: 1
    },
    {
        note_text: "Loves action movies-- favorite is Fast Five",
        person_id: 2
    }
];

const seedNotes = () => Notes.bulkCreate(notesData);
module.exports = seedNotes;