document.addEventListener("DOMContentLoaded", function () {
  const socket = io();

  // Mendengarkan event 'newPresensi'
  socket.on("newPresensi", (data) => {
    const table = document
      .getElementById("presensiTable")
      .getElementsByTagName("tbody")[0];
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.textContent = table.rows.length;
    cell2.textContent = data.nama;
    cell3.textContent = data.waktu;
  });

  // Initialize Flatpickr
  flatpickr("#waktu", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
  });
});
