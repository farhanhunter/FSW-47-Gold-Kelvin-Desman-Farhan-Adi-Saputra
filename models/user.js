"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Company, { foreignKey: "company_id" });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Company",
          key: "company_id",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
