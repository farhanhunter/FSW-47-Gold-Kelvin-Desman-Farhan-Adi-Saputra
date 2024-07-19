import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db_presensi", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Rethrow the error to catch it in the error handling middleware
  }
};

connectToDatabase();

export default sequelize;
