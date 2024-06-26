class PresensiModel {
  constructor() {
    this.presensiList = [
      // {
      //   nama: "Example Name",
      //   checkin: "2024-06-20 19:00:00",
      //   checkout: "2024-06-20 22:00:00",
      //   socialMedia: "https://example.com",
      // },
      // Add more presensi objects here for testing
    ];

    this.errorMssg;
  }

  getAllPresensi() {
    return this.presensiList;
  }

  getPaginatedPresensi(startIndex, limit) {
    return this.presensiList.slice(startIndex, startIndex + limit);
  }

  countDocuments() {
    return this.presensiList.length;
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

    const existingPresensiIndex = this.presensiList.findIndex(
      (presensi) => this.normalizeName(presensi.nama) === normalizedNama
    );

    if (existingPresensiIndex !== -1) {
      // Update the existing entry
      const existingPresensi = this.presensiList[existingPresensiIndex];

      // Only update check-in if provided
      if (presensiData.checkin) {
        existingPresensi.checkin = presensiData.checkin;
      }

      // Only update check-out if provided and check-in exists
      if (presensiData.checkout) {
        if (existingPresensi.checkin) {
          existingPresensi.checkout = presensiData.checkout;
        } else {
          // throw new Error(
          //   "Check-in must be present before check-out can be added."
          // );

          this.errorMssg =
            "Check-in must be present before check-out can be added.";
        }
      }

      // Update social media if provided
      if (presensiData.socialMedia) {
        existingPresensi.socialMedia = presensiData.socialMedia;
      }

      this.presensiList[existingPresensiIndex] = existingPresensi;
    } else {
      // Check-in must be provided for new entries
      if (!presensiData.checkin) {
        this.errorMssg = "Check-in must be provided for new entries.";
      } else {
        console.log(this.errorMssg);
        this.errorMssg = " ";
        // Add new entry
        this.presensiList.push(presensiData);
      }
    }
  }
}

export default new PresensiModel();
