"use strict";

module.exports = (sequelize, DataTypes) => {
  var Practitioner = sequelize.define("Practitioner", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false
    },
    otherNames: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: true
    },
    residence: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false
    }
  });

  return Practitioner;
};
