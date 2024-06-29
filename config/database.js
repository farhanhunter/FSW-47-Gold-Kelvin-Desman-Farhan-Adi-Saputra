import mysql from "mysql";
const connection = () => {
  const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_presensi",
  });
  return mysqlConnection;
};

export default connection;
