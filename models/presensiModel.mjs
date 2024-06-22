let presensiList = [
  {
    nama: "Example Name",
    checkin: "2024-06-20 19:00:00",
    checkout: "2024-06-20 22:00:00",
    socialMedia: "https://example.com",
  },
];

class PresensiModel {
  getAllPresensi() {
    return presensiList;
  }

  formatName(name) {
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  normalizeName(name) {
    return name.trim().toLowerCase();
  }

  upsertPresensi(presensiData) {
    const normalizedNama = this.normalizeName(presensiData.nama);
    const formattedNama = this.formatName(presensiData.nama);
    presensiData.nama = formattedNama;

    const existingPresensiIndex = presensiList.findIndex(
      (presensi) => this.normalizeName(presensi.nama) === normalizedNama
    );
    if (existingPresensiIndex !== -1) {
      presensiList[existingPresensiIndex] = presensiData;
    } else {
      presensiList.push(presensiData);
    }
  }
}

export default new PresensiModel();
