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
        errorMsg: req.session.errorMsg || "",
        successMsg: req.session.successMsg || "",
      };

      // Clear the session messages after they've been used
      req.session.errorMsg = "";
      req.session.successMsg = "";

      res.render("presensiView", {
        title: "Presensi",
        h1: "Presensi",
        presensi: results,
        activePage: "presensi",
      });
    } catch (error) {
      console.error("Error getting presensi:", error);
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

  async updatePresensi(req, res, next) {
    try {
      const { id } = req.params;
      const { clock_out, reason } = req.body;
      const page = req.query.page || 1;

      const attendance = await PresensiModel.findById(id);

      if (!attendance) {
        req.session.errorMsg = "Presensi tidak ditemukan.";
        return res.redirect(`/presensi?page=${page}`);
      }

      if (clock_out) attendance.clock_out = clock_out;
      if (reason) attendance.reason = reason;

      await attendance.save();

      req.session.successMsg = "Presensi berhasil diperbarui.";
      res.redirect(`/presensi?page=${page}`);
    } catch (error) {
      console.error("Error updating presensi:", error);
      next(error);
    }
  }

  async deletePresensi(req, res, next) {
    try {
      const { id } = req.params;
      const page = req.query.page || 1;

      const result = await PresensiModel.deleteById(id);

      req.session.successMsg = result.successMsg;
      res.redirect(`/presensi?page=${page}`);
    } catch (error) {
      console.error("Error deleting presensi:", error);
      req.session.errorMsg = error.message;
      res.redirect(`/presensi?page=${page}`);
    }
  }

  async renderPresensiViewWithError(res, errorMsg) {
    const results = await this.getPresensiResults(1, 5, errorMsg, "");

    res.render("presensiView", {
      title: "Presensi",
      h1: "Presensi",
      presensi: results,
      activePage: "presensi",
    });
  }

  async renderPresensiViewWithSuccess(res, successMsg) {
    const results = await this.getPresensiResults(1, 5, "", successMsg);

    res.render("presensiView", {
      title: "Presensi",
      h1: "Presensi",
      presensi: results,
      activePage: "presensi",
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
