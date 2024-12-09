// 토글
import React, { useState } from "react";
// import "./ToggleSwitch.css";

import "../ToggleSwitch.css";

const ToggleSwitch = ({ initial = false, onChange }) => {
  const [isToggled, setIsToggled] = useState(initial);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (onChange) onChange(!isToggled);
  };

  return (
    <div
      className={`toggle-switch ${isToggled ? "on" : "off"}`}
      onClick={handleToggle}
    >
      <div className="toggle-knob" />
    </div>
  );
};

export default ToggleSwitch;
