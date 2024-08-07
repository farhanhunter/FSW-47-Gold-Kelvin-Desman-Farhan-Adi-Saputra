import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LiveAttendance = () => {
  const [schedule, setSchedule] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch user profile to get userId
        const profileResponse = await axios.get(
          "http://localhost:3000/api/profile",
          config
        );
        setUserId(profileResponse.data.user_id);

        // Fetch attendance schedule
        const scheduleResponse = await axios.get(
          "http://localhost:3000/api/attendance-schedules",
          config
        );
        setSchedule(scheduleResponse.data[0]);

        // Fetch attendance log
        const attendanceResponse = await axios.get(
          "http://localhost:3000/api/attendances",
          config
        );
        setAttendance(attendanceResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const clockIn = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:3000/api/attendances",
        {
          user_id: userId,
          schedule_id: schedule.schedule_id,
          attendance_time: new Date().toISOString(),
          attendance_type: "clock_in",
        },
        config
      );
      setAttendance([...attendance, response.data]);
      toast.success("Clock In successful!");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error("Clock In failed!");
    }
  };

  const clockOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:3000/api/attendances",
        {
          user_id: userId,
          schedule_id: schedule.schedule_id,
          attendance_time: new Date().toISOString(),
          attendance_type: "clock_out",
        },
        config
      );
      setAttendance([...attendance, response.data]);
      toast.success("Clock Out successful!");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error("Clock Out failed!");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="px-6 py-4">
      {schedule ? (
        <>
          <small className="text-gray-500">
            Schedule, {new Date(schedule.createdAt).toLocaleDateString()}
          </small>
          <p className="font-bold mt-1">
            {schedule.clock_in} - {schedule.clock_out}
          </p>
        </>
      ) : (
        <>
          <small className="text-gray-500">No Schedule Today</small>
          <p className="font-bold mt-1">No Working Hours</p>
          <p className="text-2xl">12:00 AM - 12:00 AM</p>
        </>
      )}

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
        <button
          onClick={clockIn}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Clock In
        </button>
        <button
          onClick={clockOut}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Clock Out
        </button>
      </div>
      <div className="mt-10 w-full">
        <div className="text-left mb-3">
          <p className="text-2xl">Attendance log</p>
        </div>
        {attendance && attendance.length > 0 ? (
          <div className="text-center bg-white shadow rounded-lg py-10">
            {attendance.map((log, index) => (
              <div key={index}>
                <p>
                  {new Date(log.attendance_time).toLocaleString()} -{" "}
                  {log.attendance_type}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white shadow rounded-lg py-10">
            <img
              alt="no attendance"
              className="mx-auto"
              src="../assets/no_blank.jpg"
            />
            <div className="text-2xl mt-3 mb-2">No attendance log today</div>
            <div className="text-gray-500">
              Your Clock In/Out activity will show up here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAttendance;
