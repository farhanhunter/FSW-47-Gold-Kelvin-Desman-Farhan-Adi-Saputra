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

      res.render("presensiView", {
        title: "Presensi",
        h1: "Presensi",
        presensi: results,
        activePage: "Home", // Ensure `activePage` is set
      });
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

      if (error.message.includes("foreign key constraint fails")) {
        errorMsg = "Id anda belum terdaftar di perusahaan ini.";
      }

      this.renderPresensiViewWithError(res, errorMsg);
    }
  }

  async renderPresensiViewWithError(res, errorMsg) {
    const results = await this.getPresensiResults(1, 5, errorMsg, "");

    res.render("presensiView", {
      title: "Presensi",
      h1: "Presensi",
      presensi: results,
      activePage: "Home", // Ensure `activePage` is set
    });
  }

  async renderPresensiViewWithSuccess(res, successMsg) {
    const results = await this.getPresensiResults(1, 5, "", successMsg);

    res.render("presensiView", {
      title: "Presensi",
      h1: "Presensi",
      presensi: results,
      activePage: "Home", // Ensure `activePage` is set
    });
  }

  async getPresensiResults(page, limit, errorMsg = "", successMsg = "") {
    const startIndex = (page - 1) * limit;
    const presensiList = await PresensiModel.getPaginatedPresensi(
      startIndex,
      limit
    );
    const totalCount = await PresensiModel.countDocuments();

    return {
      results: presensiList,
      page: page,
      totalCount: totalCount,
      previous: page > 1 ? { page: page - 1 } : null,
      next: startIndex + limit < totalCount ? { page: page + 1 } : null,
      errorMsg: errorMsg,
      successMsg: successMsg,
    };
  }
}

export default new PresensiController();
