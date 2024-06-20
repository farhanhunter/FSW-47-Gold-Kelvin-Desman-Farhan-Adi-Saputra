const presensiModel = require("../models/presensiModel");
const fs = require("fs");
const path = require("path");

class PresensiController {
  getPresensi(req, res) {
    const presensi = presensiModel.getAllPresensi();
    fs.readFile(
      path.join(__dirname, "../views/presensiView.html"),
      "utf8",
      (err, data) => {
        if (err) {
          res.status(500).send("Page Not Found");
          return;
        }
        const rendered = data.replace(
          "{{ presensi }}",
          presensi
            .map((item) => `<li>${item.nama} - ${item.waktu}</li>`)
            .join("")
        );
        res.send(rendered);
      }
    );
  }
  postPresensi(req, res, callback) {
    const newPresensi = {
      nama: req.body.nama,
      waktu: req.body.waktu,
    };
    presensiModel.postPresensi(newPresensi);
    callback(newPresensi); // Panggil callback setelah menambahkan presensi baru
  }
}

module.exports = new PresensiController();
