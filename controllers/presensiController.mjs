import presensiModel from "../models/presensiModel.mjs";

class PresensiController {
  getPresensi(req, res) {
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameter or default to 1
    const limit = 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Calculate the starting index for the current page
    const endIndex = page * limit; // Calculate the ending index for the current page

    const presensiList = presensiModel.getPaginatedPresensi(startIndex, limit); // Fetch the paginated data
    const totalCount = presensiModel.countDocuments(); // Get the total number of documents

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

    res.render("presensiView", { presensi: results }); // Pass the paginated results to the view
  }

  postPresensi(req, res, callback) {
    const newPresensi = {
      nama: req.body.nama,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      socialMedia: req.body.socialMedia,
    };
    presensiModel.upsertPresensi(newPresensi);
    callback(newPresensi); // Call callback after adding new presensi
  }
}

export default new PresensiController();
