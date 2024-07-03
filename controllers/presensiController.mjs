import PresensiModel from "../models/presensiModel.mjs";

class PresensiController {
  async getPresensi(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const startIndex = (page - 1) * limit;

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
        next: startIndex + limit < totalCount ? { page: page + 1 } : null,
        errorMsg: "",
        successMsg: "",
      };

      res.render("presensiView", { presensi: results });
    } catch (error) {
      next(error);
    }
  }

  async postPresensi(req, res, next) {
    try {
      const { user_id, clock_in, clock_out, reason } = req.body;

      if (!clock_in) {
        return this.renderPresensiViewWithError(res, "Clock-in harus diisi.");
      }

      if (!clock_out) {
        return this.renderPresensiViewWithError(res, "Clock-out harus diisi.");
      }

      const { successMsg, presensi } =
        await PresensiModel.insertOrUpdatePresensi({
          user_id,
          clock_in,
          clock_out,
          reason,
        });

      this.renderPresensiViewWithSuccess(res, successMsg);

      req.app.get("io").emit("newPresensi", presensi);
    } catch (error) {
      console.error("Error saat menyimpan presensi:", error);
      let errorMsg = error.message;

      // Handling specific error messages
      if (
        error.message.includes(
          "foreign key constraint fails (`db_presensi`.`attendances`, CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)"
        )
      ) {
        errorMsg = "Id anda belum terdaftar di perusahaan ini.";
      } else if (
        error.message.includes(
          "Cannot add or update a child row: a foreign key constraint fails (`db_presensi`.`attendances`, CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE)"
        )
      ) {
        errorMsg = "Id anda belum terdaftar di perusahaan ini.";
      }

      this.renderPresensiViewWithError(res, errorMsg);
    }
  }

  async renderPresensiViewWithError(res, errorMsg) {
    const presensiList = await PresensiModel.getPaginatedPresensi(0, 5);
    const totalCount = await PresensiModel.countDocuments();

    const results = {
      results: presensiList,
      page: 1,
      totalCount: totalCount,
      errorMsg: errorMsg,
      successMsg: "",
      previous: null,
      next: 5 < totalCount ? { page: 2 } : null,
    };

    res.render("presensiView", { presensi: results });
  }

  async renderPresensiViewWithSuccess(res, successMsg) {
    const presensiList = await PresensiModel.getPaginatedPresensi(0, 5);
    const totalCount = await PresensiModel.countDocuments();

    const results = {
      results: presensiList,
      page: 1,
      totalCount: totalCount,
      errorMsg: "",
      successMsg: successMsg,
      previous: null,
      next: 5 < totalCount ? { page: 2 } : null,
    };

    res.render("presensiView", { presensi: results });
  }
}

export default new PresensiController();
