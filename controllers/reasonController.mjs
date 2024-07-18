import ReasonModel from "../models/reasonModel.mjs";

class ReasonController {
  async getReasons(req, res, next) {
    try {
      const reasons = await ReasonModel.getAll();
      console.log("Reasons:", reasons); // Tambahkan log ini

      const formattedReasons = reasons.map((reason) => {
        const shortReason = reason.reason
          ? this.getShortReason(reason.reason)
          : "No reason provided";
        const duration = this.calculateDuration(
          reason.clock_in,
          reason.clock_out
        );
        const timeAgo = this.calculateTimeAgo(reason.clock_in);
        const userName = reason.User ? reason.User.nama : "Unknown user";
        const userRole = reason.User ? reason.User.role : "Unknown role";

        return {
          ...reason.dataValues, // Pastikan kita menggunakan dataValues untuk mendapatkan properti dari sequelize instance
          shortReason,
          duration,
          timeAgo,
          User: {
            nama: userName,
            role: userRole,
          },
        };
      });

      console.log("Formatted Reasons:", formattedReasons); // Tambahkan log ini

      res.render("reason", {
        title: "Reason",
        h1: "Reason",
        reasons: formattedReasons,
        activePage: "reasons",
      });
    } catch (error) {
      console.error(error); // Tambahkan log ini
      next(error);
    }
  }

  getShortReason(reason) {
    return reason.slice(0, 20);
  }

  calculateDuration(clock_in, clock_out) {
    const duration = new Date(clock_out) - new Date(clock_in);
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
  }

  calculateTimeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }

  async submitReason(req, res, next) {
    try {
      const { reason, duration, user_id } = req.body;
      await ReasonModel.createReason({ reason, duration, user_id });
      res.redirect("/reasons");
    } catch (error) {
      console.error(error); // Tambahkan log ini
      next(error);
    }
  }
}

export default new ReasonController();
