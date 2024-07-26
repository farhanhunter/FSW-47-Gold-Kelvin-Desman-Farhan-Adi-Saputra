"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      UserSession.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  UserSession.init(
    {
      session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      login_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      logout_time: {
        type: DataTypes.DATE,
        allowNull: true, // Nullable since user might not have logged out yet
        validate: {
          // Optional: Ensure logout_time is greater than login_time
          isAfter(value) {
            if (
              this.login_time &&
              value &&
              new Date(value) <= new Date(this.login_time)
            ) {
              throw new Error("logout_time must be after login_time");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "UserSession",
    }
  );

  return UserSession;
};
