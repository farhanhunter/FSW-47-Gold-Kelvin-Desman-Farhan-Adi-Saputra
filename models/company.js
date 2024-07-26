"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Company.hasMany(models.User, { foreignKey: "company_id" });
      Company.hasMany(models.AttendanceSchedule, { foreignKey: "company_id" });
    }
  }

  Company.init(
    {
      company_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        // Optional: Add validation for phone number format if necessary
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures unique emails
        validate: {
          isEmail: true, // Validates that the email format is correct
        },
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );

  return Company;
};
