let presensi = [
  { nama: "Example Name", waktu: "2024-06-20 19:00:00" },
  { nama: "Farhan Adi Saputra", waktu: "2024-06-20 19:00:00" },
];

class PresensiModel {
  getAllPresensi() {
    return presensi;
  }
  postPresensi(newPresensi) {
    presensi.push(newPresensi);
  }
}

module.exports = new PresensiModel();
