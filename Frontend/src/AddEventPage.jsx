import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai"; 
import "./styles/AddEventPage.css";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdOutlineEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { FaPrayingHands } from "react-icons/fa";
import EventPopup from "./components/EventPopup";
const AddEventPage = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 78;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const renderContent = () => {
    if (activeTab === "Users") {
      return (
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <tr key={index}>
                    <td>{`0000${index + 1}`}</td>
                    <td>John Doe</td>
                    <td>johndoe3032@gmail.com</td>
                    <td>{index % 2 === 0 ? "Percentage" : "Fixed Amount"}</td>
                    <td>7 days ago</td>
                    <td>
                      <button className="edit-btn"><FaEdit /></button>
                      <button className="delete-btn"><RiDeleteBin5Line /></button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "Events") {
      return <div className="placeholder">Event List Content</div>;
    }

    if (activeTab === "Bookings") {
      return <div className="placeholder">Bookings List Content</div>;
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">🌟 Mellodian Community Park</div>
        <button className="logout-button">
          <FiLogOut /> Logout
        </button>
      </nav>

      <div className="home-logo">
        <AiFillHome className="home-icon" />
        <a href="/" className="home-text">Home</a>
      </div>

      <div className="stats-section">
        <div className="stat-card">Total Users<br /><span>1133</span> <div id="iconuser"><FaUsers/></div></div>
        <div className="stat-card">Total Events<br /><span>73</span> <div id="iconuser"><MdOutlineEvent/></div></div>
        <div className="stat-card">Total Bookings<br /><span>350</span><div id="iconuser"><MdEventAvailable/></div></div>
        <div className="stat-card">Revenue<br /><span>$10M</span><div id="iconuser"><FaPrayingHands/></div></div>
      </div>

      <div className="tab-section">
        <div className="tabs">
          <button
            className={activeTab === "Users" ? "active" : ""}
            onClick={() => setActiveTab("Users")}
          >
            Users
          </button>
          <button
            className={activeTab === "Events" ? "active" : ""}
            onClick={() => setActiveTab("Events")}
          >
            Events
          </button>
          <button
            className={activeTab === "Bookings" ? "active" : ""}
            onClick={() => setActiveTab("Bookings")}
          >
            Bookings
          </button>
        </div>

        <div className="search-export">
        <button className="export-btn">Export List</button>
          <input className="search-bar" type="text" placeholder="Search here..." /> <div id="addsearch"><FiSearch /></div>
          <button
            className="add-event-button"
            onClick={() => setIsPopupOpen(true)}
          >
            + Add New Event
          </button>
        </div>

        {renderContent()}
      </div>

      <footer className="footer">
        <div className="footer-left">2024 © All Rights Reserved.</div>
        <div className="pagination">
          <span>Rows per page: 1-9 of {totalPages}</span>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ◀
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ▶
          </button>
        </div>
      </footer>
      <EventPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
    
  );
};

export default AddEventPage;
