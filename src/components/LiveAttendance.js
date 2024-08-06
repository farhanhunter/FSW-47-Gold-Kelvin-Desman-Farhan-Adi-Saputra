import React from "react";

const LiveAttendance = () => {
  return (
    <div className="px-6 py-4">
      <small className="text-gray-500">Schedule, 06 Aug 2024</small>
      <p className="font-bold mt-1">No Working Hours</p>
      <p className="text-2xl">12:00 AM - 12:00 AM</p>
      <div className="mt-4">
        <label className="block text-left w-full">
          Notes <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          placeholder="Text"
          rows="1"
          className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div className="flex space-x-4 mt-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Clock In
        </button>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Clock Out
        </button>
      </div>
      <div className="mt-10 w-full">
        <div className="text-left mb-3">
          <p className="text-2xl">Attendance log</p>
        </div>
        <div className="text-center bg-white shadow rounded-lg py-10">
          <img
            alt="no attendance"
            className="mx-auto"
            src="../assets/no_blank.jpg" // Update path here
          />
          <div className="text-2xl mt-3 mb-2">No attendance log today</div>
          <div className="text-gray-500">
            Your Clock In/Out activity will show up here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAttendance;
