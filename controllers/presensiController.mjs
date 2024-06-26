// presensiController.mjs
import presensiModel from "../models/presensiModel.mjs";

class PresensiController {
  getPresensi(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const presensiList = presensiModel.getPaginatedPresensi(
        startIndex,
        limit
      );
      const totalCount = presensiModel.countDocuments();

      const results = {
        results: presensiList,
        page: page,
        totalCount: totalCount,
      };

      if (endIndex < totalCount) {
        results.next = {
          page: page + 1,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
        };
      }

      if (presensiModel.errorMssg != " ") {
        results.errorMssg = "Can not entry Data , Check in must be filled";
      }

      console.log(results);

      res.render("presensiView", { presensi: results });
    } catch (error) {
      next(error);
    }
  }

  async postPresensi(req, res, next) {
    try {
      const { nama, checkin, checkout, socialMedia } = req.body;

      // if (!checkin) {
      //   throw new Error("Check-in must be provided for new entries");
      // }

      const newPresensi = { nama, checkin, checkout, socialMedia };

      await presensiModel.upsertPresensi(newPresensi);
      req.app.get("io").emit("newPresensi", newPresensi);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

export default new PresensiController();
