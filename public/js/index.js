document.addEventListener("DOMContentLoaded", function () {
  // Event listener untuk delete
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const id = this.dataset.id;

      if (confirm("Are you sure you want to delete this entry?")) {
        fetch(`/delete-presensi/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              window.location.reload();
            } else {
              alert("Error deleting presensi");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error deleting presensi");
          });
      }
    });
  });
  const socket = io();

  socket.on("newPresensi", (data) => {
    const currentPage =
      parseInt(document.getElementById("page-number").value) || 1;
    const limit = 5;

    if (data.page === currentPage) {
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

          currentTableBody.innerHTML = newTableBody.innerHTML;
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

  window.submitUpdateForm = function (event, form) {
    event.preventDefault();
    const id = form.querySelector('input[name="id"]').value;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(`/update-presensi/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Error updating presensi");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error updating presensi");
      });
  };
});
