import PresensiModel from "../models/presensiModel.mjs";

class PresensiController {
  async getPresensi(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const presensiList = await PresensiModel.getPaginatedPresensi(
        startIndex,
        limit
      );
      const totalCount = await PresensiModel.countDocuments();

      const results = {
        results: presensiList,
        page: page,
        totalCount: totalCount,
        previous: page > 1 ? { page: page - 1 } : null,
        next: endIndex < totalCount ? { page: page + 1 } : null,
      };

      if (PresensiModel.errorMssg != "") {
        results.errorMssg = PresensiModel.errorMssg;
        results.successMsg = "";
      } else {
        results.successMsg = PresensiModel.successMsg;
        PresensiModel.successMsg = "";
      }

      res.render("presensiView", { presensi: results });
    } catch (error) {
      next(error);
    }
  }

  async postPresensi(req, res, next) {
    try {
      const { nama, user_id, checkin, checkout, role } = req.body;

      const newPresensi = {
        nama,
        user_id,
        checkin,
        checkout,
        role,
      };

      // Validasi bahwa checkin tidak boleh kosong
      if (!checkin) {
        PresensiModel.errorMssg = "Clock-in harus diisi.";
        const presensiList = await PresensiModel.getPaginatedPresensi(0, 5);
        const totalCount = await PresensiModel.countDocuments();
        const results = {
          results: presensiList,
          page: 1,
          totalCount: totalCount,
          errorMssg: PresensiModel.errorMssg,
          successMsg: PresensiModel.successMsg,
          previous: null,
          next: 5 < totalCount ? { page: 2 } : null,
        };
        res.render("presensiView", { presensi: results });
        return;
      }

      // Validasi bahwa checkout tidak boleh kosong jika checkin sudah ada
      if (!checkout && checkin) {
        PresensiModel.errorMssg = "Clock-out harus diisi.";
        const presensiList = await PresensiModel.getPaginatedPresensi(0, 5);
        const totalCount = await PresensiModel.countDocuments();
        const results = {
          results: presensiList,
          page: 1,
          totalCount: totalCount,
          errorMssg: PresensiModel.errorMssg,
          successMsg: PresensiModel.successMsg,
          previous: null,
          next: 5 < totalCount ? { page: 2 } : null,
        };
        res.render("presensiView", { presensi: results });
        return;
      }

      await PresensiModel.insertOrUpdatePresensi(newPresensi);

      const presensiList = await PresensiModel.getPaginatedPresensi(0, 5);
      const totalCount = await PresensiModel.countDocuments();

      const results = {
        results: presensiList,
        page: 1,
        totalCount: totalCount,
        errorMssg: PresensiModel.errorMssg,
        successMsg: PresensiModel.successMsg,
        previous: null,
        next: 5 < totalCount ? { page: 2 } : null,
      };

      req.app.get("io").emit("newPresensi", newPresensi);

      res.render("presensiView", { presensi: results });
    } catch (error) {
      next(error);
    }
  }
}

export default new PresensiController();
