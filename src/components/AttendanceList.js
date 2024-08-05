import React from "react";

const data = [
  { id: 1, name: "John Doe", status: "Present" },
  { id: 2, name: "Jane Smith", status: "Absent" },
  // Tambahkan data lainnya sesuai kebutuhan
];

function AttendanceList() {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.name} - {item.status}
        </li>
      ))}
    </ul>
  );
}

export default AttendanceList;
