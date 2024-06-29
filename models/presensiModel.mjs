import connection from "../config/database.js";

class PresensiModel {
  constructor() {
    this.errorMssg = "";
    this.successMsg = "";
  }

  async getAllPresensi() {
    const db = connection();

    return new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) {
          reject(err);
          return;
        }

        const selectQuery = "SELECT * FROM attendances";
        db.query(selectQuery, (err, results) => {
          db.end();

          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  }

  async getPaginatedPresensi(startIndex, limit) {
    const db = connection();

    return new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) {
          reject(err);
          return;
        }

        const selectQuery = "SELECT * FROM attendances LIMIT ?, ?";
        db.query(selectQuery, [startIndex, limit], (err, results) => {
          db.end();

          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  }

  async countDocuments() {
    const db = connection();

    return new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) {
          reject(err);
          return;
        }

        const countQuery = "SELECT COUNT(*) AS count FROM attendances";
        db.query(countQuery, (err, results) => {
          db.end();

          if (err) {
            reject(err);
          } else {
            resolve(results[0].count);
          }
        });
      });
    });
  }

  async readPresensi() {
    const db = connection();

    return new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) {
          reject(err);
          return;
        }

        const selectQuery = "SELECT * FROM attendances";
        db.query(selectQuery, (err, results) => {
          db.end();

          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
  }

  formatName(name) {
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  normalizeName(name) {
    return name.trim().toLowerCase();
  }

  capitalizeName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  async insertOrUpdatePresensi(presensiData) {
    const userId = presensiData.user_id;
    const nama = this.capitalizeName(presensiData.nama); // Capitalize name
    const clockIn = presensiData.checkin;
    const clockOut = presensiData.checkout;
    const role = presensiData.role;

    const db = connection();

    return new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) {
          reject(err);
          return;
        }

        const selectQuery =
          "SELECT * FROM attendances WHERE user_id = ? AND DATE(clock_in) = DATE(?)";
        db.query(selectQuery, [userId, clockIn], (err, result) => {
          if (err) {
            db.end();
            reject(err);
            return;
          }

          if (result.length > 0) {
            // Update the existing entry
            const existingPresensi = result[0];

            if (clockOut && existingPresensi.clock_in) {
              const updateQuery =
                "UPDATE attendances SET clock_out = ?, role = ? WHERE id = ?";

              db.query(
                updateQuery,
                [clockOut, role, existingPresensi.id],
                (err, result) => {
                  db.end();

                  if (err) {
                    reject(err);
                  } else {
                    this.successMsg = "Clock-out updated successfully.";
                    resolve(result);
                  }
                }
              );
            } else {
              db.end();
              reject("Clock-in must be present before clock-out can be added.");
            }
          } else {
            // Insert new entry
            if (!clockIn) {
              db.end();
              reject("Clock-in harus disediakan untuk entri baru.");
            } else {
              const insertQuery =
                "INSERT INTO attendances (user_id, nama, clock_in, clock_out, role) VALUES (?, ?, ?, ?, ?)";

              db.query(
                insertQuery,
                [userId, nama, clockIn, clockOut, role],
                (err, result) => {
                  db.end();

                  if (err) {
                    reject(err);
                  } else {
                    this.successMsg = "Entri baru berhasil ditambahkan.";
                    resolve(result);
                  }
                }
              );
            }
          }
        });
      });
    });
  }

  getPageNumberForNewEntry(limit) {
    const totalCount = this.countDocuments();
    return Math.ceil(totalCount / limit);
  }
}

export default new PresensiModel();
