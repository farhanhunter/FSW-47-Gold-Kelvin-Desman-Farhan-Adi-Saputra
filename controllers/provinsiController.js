const provinsiModel = require("../models/provinsiModel");
const fs = require("fs");
const path = require("path");

class ProvinsiController {
  getProvinsi(req, res) {
    const provinsiList = provinsiModel.getAllProvinsi();
    fs.readFile(
      path.join(__dirname, "../views/provinsiView.html"),
      (err, data) => {
        console.log(data);
        if (err) {
          res.status(500).send("Error reading provinsi.json");
          return;
        } else {
          const rendered = data.replace(
            "{{provinsi}}",
            provinsiList.map((item) => `<li>${item}</li>`).join("")
          );
          res.status(200).send(rendered);
        }
      }
    );
  }

  addProvinsi(req, res) {
    const newItem = new URLSearchParams(req.body).get("provinsi");
    provinsiModel.addProvinsi(req.body["provinsi"]);
    res.redirect("/provinsi");
  }
}

module.exports = ProvinsiController;
