export const handleError = (req, res) => {
  res.status(404).render("errorView", { error: "Halaman tidak ditemukan" });
};
