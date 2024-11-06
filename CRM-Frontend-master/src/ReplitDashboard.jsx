import { useEffect, useState } from "react";
import axios from "axios";
import "./ReplitDashboard.css";
import { FaRegBell, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useToken } from "./main";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "./main";

const ReplitDashboard = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [blob, setBlob] = useState(null);
  const { token, setToken } = useToken();

  if (!token || token === "" || token === "undefined") {
    return <Navigate to="/login" />;
  }

  const downloadFile = async () => {
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "processed_file.xlsx";
    link.remove();

    document.body.appendChild(link);
    link.click();
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleEnterQueue = async () => {
    if (isFinished) {
      downloadFile();
      return;
    }

    if (file1 && file2) {
      console.log(file1);
      console.log(file2);
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);

      try {
        console.log(token);
        const response = await axios.post(
          API + "/api/compute",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const blobdata = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        setBlob(blobdata);
        setIsFinished(true);
      } catch (error) {
        console.error("File download failed:", error);
        alert("There was an error processing your request. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert("Please upload both datasets.");
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div id="cont">
          {isDrawerOpen ? (
            <FaTimes className="menu-icon" onClick={toggleDrawer} />
          ) : (
            <FaBars className="menu-icon" onClick={toggleDrawer} />
          )}
          <div className="navbar-logo">Replit Dashboard</div>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
        <div className="navbar-icons">
          <FaRegBell className="icon" />
          <CgProfile className="icon" />
        </div>
      </div>

      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleDrawer}>
          X
        </button>
        <ul id="sidebar-components">
          <li>Dashboard</li>
          <hr />
          <li>Profile</li>
          <hr />
          <li>Settings</li>
          <hr />
          <li>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Start Sales Analysis</h1>
        <p>
          Upload the following files and click "Enter Queue" to start
          processing.
        </p>
        <div className="file-upload-section">
          <div className="upload-box">
            <label>Upload Excel File Communication Log</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setFile1)}
            />
          </div>
          <div className="upload-box">
            <label>Upload Excel File Lead Details</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setFile2)}
            />
          </div>
        </div>
        <button onClick={handleEnterQueue} className="enter-queue-btn">
          {isProcessing
            ? "Processing..."
            : isFinished
              ? "Download Processed File"
              : "Enter Queue"}
        </button>
      </div>
    </div>
  );
};

export default ReplitDashboard;
