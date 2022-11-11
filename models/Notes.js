const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Notes extends Model{}

Notes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        note_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        person_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'person',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestampts: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'notes'
    }
);

module.exports = Notes;