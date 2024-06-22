import provinsiModel from "../models/provinsiModel.mjs";

class ProvinsiController {
  getProvinsi(req, res) {
    const provinsi = provinsiModel.getAllProvinsi();
    res.render("provinsiView", { provinsi });
  }

  addProvinsi(req, res) {
    const newItem = new URLSearchParams(req.body).get("provinsi");
    provinsiModel.addProvinsi(newItem);
    res.redirect("/provinsi");
  }
}

export default new ProvinsiController();
