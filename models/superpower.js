'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperPower extends Model {
    static associate (models) {
      SuperPower.belongsToMany(models.Superhero, {
        through: 'heroes_to_powers',
        foreignKey: 'superPowerId',
      });
    }
  }
  SuperPower.init(
    {
      power: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'SuperPower',
      tableName: 'superpowers',
      underscored: true,
    }
  );
  return SuperPower;
};
