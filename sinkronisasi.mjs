import sequelize from "./config/database.mjs";
import "./models/associations.mjs"; // Mengimpor asosiasi

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to create tables:", error);
    throw error; // Rethrow the error to catch it in the error handling middleware
  }
};

syncDatabase();
