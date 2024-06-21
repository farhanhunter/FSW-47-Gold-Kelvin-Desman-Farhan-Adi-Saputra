document.addEventListener("DOMContentLoaded", function () {
  const socket = io();

  // Mendengarkan event 'newPresensi'
  socket.on("newPresensi", (presensi) => {
    const tableBody = document
      .getElementById("presensiTable")
      .getElementsByTagName("tbody")[0];
    const row = table.insertRow();
    const cellNumber = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellCheckin = row.insertCell(2);
    const cellCheckout = row.insertCell(3);
    cellNumber.textContent = tableBody.rows.length;
    cellName.innerHTML = `<a href="${presensi.socialMedia}" target="_blank">${presensi.nama}</a>`;
    cellCheckin.textContent = presensi.checkin;
    cellCheckout.textContent = presensi.checkout;
  });

  // Initialize Flatpickr for check in
  flatpickr("#checkin", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
  });

  // Initialize Flatpickr for check out
  flatpickr("#checkout", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
  });
});
