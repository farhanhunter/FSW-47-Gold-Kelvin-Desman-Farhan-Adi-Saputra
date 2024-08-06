import React from "react";
import ClockContainer from "../components/ClockContainer";
import LiveAttendance from "../components/LiveAttendance";

const ClockPage = () => {
  return (
    <ClockContainer>
      <LiveAttendance />
    </ClockContainer>
  );
};

export default ClockPage;
