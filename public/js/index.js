document.addEventListener("DOMContentLoaded", function () {
  const socket = io();

  socket.on("newPresensi", (presensi) => {
    const tableBody = document
      .getElementById("presensiTable")
      .getElementsByTagName("tbody")[0];
    const row = tableBody.insertRow();
    const cellNumber = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellCheckin = row.insertCell(2);
    const cellCheckout = row.insertCell(3);
    cellNumber.textContent = tableBody.rows.length;
    cellName.innerHTML = `<a href="${presensi.socialMedia}" target="_blank" class="text-dark-blue hover:text-light-blue">${presensi.nama}</a>`;
    cellCheckin.textContent = presensi.checkin;
    cellCheckout.textContent = presensi.checkout;
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
