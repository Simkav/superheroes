'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperHero extends Model {
    static associate (models) {
      SuperHero.belongsToMany(models.SuperPower, {
        through: 'heroes_to_powers',
        foreignKey: 'heroId',
      });
      SuperHero.hasMany(models.Image, {
        foreignKey: 'heroId',
      });
    }
  }
  SuperHero.init(
    {
      nickname: {
        allowNull: false,
        unique:true,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      realName: {
        allowNull: false,
        field: 'real_name',
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      originDescription: { field: 'origin_description', type: DataTypes.TEXT },
      catchPhrase: { field: 'catch_phrase', type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'SuperHero',
      tableName: 'superheroes',
      underscored: true,
    }
  );
  return SuperHero;
};
