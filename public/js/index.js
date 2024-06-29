document.addEventListener("DOMContentLoaded", function () {
  const socket = io();

  socket.on("newPresensi", (data) => {
    const currentPage =
      parseInt(document.getElementById("page-number").value) || 1;
    const limit = 5;

    // Check if the new presensi is on the current page
    if (data.page === currentPage) {
      // Fetch the updated data for the current page
      fetch(`/?page=${currentPage}`)
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const newTableBody = doc
            .getElementById("presensiTable")
            .getElementsByTagName("tbody")[0];
          const currentTableBody = document
            .getElementById("presensiTable")
            .getElementsByTagName("tbody")[0];

          // Replace the current table body with the new one
          currentTableBody.innerHTML = newTableBody.innerHTML;

          // Update the pagination controls
          const newPageNumber = doc.getElementById("page-number").value;
          document.getElementById("page-number").value = newPageNumber;

          const paginationControls = doc.querySelector(".pagination");
          document.querySelector(".pagination").innerHTML =
            paginationControls.innerHTML;
        });
    }
  });

  flatpickr("#checkin", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
  });

  flatpickr("#checkout", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
  });
});
