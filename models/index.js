// import models
const User = require(`./User`);
const Person = require('./Person');
const Notes = require('./Notes')

// model associations

User.hasMany(Person, {
    foreignKey: `user_id`
});

Person.belongsTo(User, {
    foreignKey: `user_id`
});

Person.hasMany(Notes, {
    foreignKey: `person_id`
})

Notes.belongsTo(Person, {
    foreignKey: `person_id`
})

module.exports = {
    Person,
    User,
    Notes
}