const provinsiModel = require("../models/provinsiModel");
const fs = require("fs");
const path = require("path");

class ProvinsiController {
  getProvinsi(req, res) {
    const provinsi = provinsiModel.getAllProvinsi();
    res.render("provinsiView", { provinsi });
  }

  addProvinsi(req, res) {
    const newItem = new URLSearchParams(req.body).get("provinsi");
    provinsiModel.addProvinsi(provinsi);
    res.redirect("/provinsi");
  }
}

module.exports = ProvinsiController;
