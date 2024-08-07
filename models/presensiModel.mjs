import { Op } from "sequelize";
import Attendance from "./attendanceModel.mjs";
import User from "./userModel.mjs";

class PresensiModel {
  async getAllPresensi() {
    return await Attendance.findAll({
      include: {
        model: User,
        attributes: ["nama", "role"],
      },
    });
  }

  async getPaginatedPresensi(startIndex, limit) {
    return await Attendance.findAll({
      include: {
        model: User,
        attributes: ["nama", "role"],
      },
      limit: limit,
      offset: startIndex,
    });
  }

  async countDocuments() {
    return await Attendance.count();
  }

  formatName(name) {
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  normalizeName(name) {
    return name.trim().toLowerCase();
  }

  capitalizeName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  async insertOrUpdatePresensi(presensiData) {
    const { user_id, clock_in, clock_out, reason } = presensiData;

    // Check if user_id exists in users table
    const existingUser = await User.findByPk(user_id);
    if (!existingUser) {
      throw new Error("Id anda belum terdaftar di perusahaan ini.");
    }

    if (!clock_in) {
      throw new Error("Clock-in harus disediakan untuk entri baru.");
    }

    // Validasi data datetime untuk clock_out jika diisi
    if (clock_out && isNaN(Date.parse(clock_out))) {
      throw new Error("Format tanggal clock-out tidak valid.");
    }

    // Mencari entri dengan user_id dan clock_in yang sama
    const existingPresensi = await Attendance.findOne({
      where: {
        user_id: user_id,
        clock_in: clock_in,
      },
    });

    if (existingPresensi) {
      if (clock_out) existingPresensi.clock_out = clock_out;
      if (reason) existingPresensi.reason = reason;
      await existingPresensi.save();
      return {
        successMsg: "Presensi berhasil diperbarui.",
        presensi: existingPresensi,
      };
    } else {
      const newPresensi = await Attendance.create({
        user_id: user_id,
        clock_in: clock_in,
        clock_out: clock_out || null,
        reason: reason,
      });
      return {
        successMsg: "Entri baru berhasil ditambahkan.",
        presensi: newPresensi,
      };
    }
  }

  async getPageNumberForNewEntry(limit) {
    const totalCount = await this.countDocuments();
    return Math.ceil(totalCount / limit);
  }
}

export default new PresensiModel();
