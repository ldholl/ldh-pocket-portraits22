const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Person extends Model {}

Person.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        has_children: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        has_pets: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        likes_sports: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        likes_media: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: `user`,
        //         key: `id`
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'person'
    }
);

module.exports = Person;