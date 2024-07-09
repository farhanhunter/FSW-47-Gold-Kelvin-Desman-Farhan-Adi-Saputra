import ReasonModel from "../models/reasonModel.mjs";

class ReasonController {
  async getReasons(req, res, next) {
    try {
      const reasons = await ReasonModel.getAll();

      const formattedReasons = reasons.map((reason) => ({
        ...reason,
        shortReason: this.getShortReason(reason.reason),
        duration: this.calculateDuration(reason.clock_in, reason.clock_out),
        timeAgo: this.calculateTimeAgo(reason.clock_in),
      }));

      res.render("reason", {
        title: "Reason",
        h1: "Reason",
        reasons: formattedReasons,
        activePage: "reasons",
      });
    } catch (error) {
      next(error);
    }
  }

  getShortReason(reason) {
    return reason.slice(0, 20); // Ambil 20 karakter pertama dari reason
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
}

export default new ReasonController();
