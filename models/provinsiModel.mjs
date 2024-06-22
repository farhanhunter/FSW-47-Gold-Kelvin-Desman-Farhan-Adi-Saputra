class ProvinsiModel {
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

export default new ProvinsiModel();
