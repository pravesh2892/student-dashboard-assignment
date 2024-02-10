import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="side-bar">
        <div className="list-item"
         onClick={() => {
              navigate("/");
            }}
        >
          <div
            className="icon">
            <MdDashboardCustomize />
          </div>
          <div className="text">
            <p style={{ marginBottom: "0" }}>Dashboard</p>
          </div>
        </div>
        <div className="list-item">
          <div className="icon">
            <FaListAlt />
          </div>
          <div className="text" onClick={()=>{navigate("/EnrollStudent")}}>
            <p style={{ marginBottom: "0" }}> Enrolled student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
