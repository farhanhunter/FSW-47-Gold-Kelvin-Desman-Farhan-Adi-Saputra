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

  async findById(id) {
    return await Attendance.findByPk(id, {
      include: {
        model: User,
        attributes: ["nama", "role"],
      },
    });
  }

  async deleteById(id) {
    const result = await Attendance.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      throw new Error("Presensi tidak ditemukan.");
    }

    return {
      successMsg: "Presensi berhasil dihapus.",
    };
  }

  async insertOrUpdatePresensi(presensiData) {
    const { user_id, clock_in, clock_out, reason } = presensiData;
    console.log("Data yang diterima untuk pembaruan:", presensiData);
    const existingUser = await User.findByPk(user_id);

    if (!existingUser) {
      throw new Error("Id anda belum terdaftar di perusahaan ini.");
    }

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
