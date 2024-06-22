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
      // Update the existing entry
      const existingPresensi = presensiList[existingPresensiIndex];

      // Only update check-in if provided
      if (presensiData.checkin) {
        existingPresensi.checkin = presensiData.checkin;
      }

      // Only update check-out if provided
      if (presensiData.checkout) {
        existingPresensi.checkout = presensiData.checkout;
      }

      // Update social media if provided
      if (presensiData.socialMedia) {
        existingPresensi.socialMedia = presensiData.socialMedia;
      }

      presensiList[existingPresensiIndex] = existingPresensi;
    } else {
      // Add new entry
      presensiList.push(presensiData);
    }
  }
}

export default new PresensiModel();
