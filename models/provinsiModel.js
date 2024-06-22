class provinsiModel {
  constructor() {
    this.items = [];
  }

  getAllProvinsi() {
    return this.items;
  }

  addProvinsi(provinsi) {
    this.items.push(provinsi);
  }
}

module.exports = new provinsiModel();
