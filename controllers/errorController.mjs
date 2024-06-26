// errorController.mjs
export const handleNotFound = (req, res) => {
  console.error("Error: Halaman tidak ditemukan"); // Log error to the terminal
  res.status(404).render("errorView", { error: "Halaman tidak ditemukan" });
};

export const handleError = (err, req, res, next) => {
  console.error(err.stack); // Log error to the terminal

  if (err.message.includes("Check-in must be provided for new entries")) {
    res.status(400).send("Data check-in belum ada");
  } else {
    res.status(500).send("Something went wrong!");
  }
};
