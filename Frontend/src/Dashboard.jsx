import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import "./styles/Dashboard.css";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaEdit, FaUsers, FaPrayingHands } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEvent, MdEventAvailable } from "react-icons/md";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 78;

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
                      <button className="edit-btn">
                        <FaEdit />
                      </button>
                      <button className="delete-btn">
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "Events") {
      return (
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Tickets Sold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <tr key={index}>
                    <td>{`0000${index + 1}`}</td>
                    <td>Community Gala</td>
                    <td>New York City</td>
                    <td>2024-11-22</td>
                    <td>7:00 PM</td>
                    <td>{Math.floor(Math.random() * 500)}</td>
                    <td>
                      <button className="edit-btn">
                        <FaEdit />
                      </button>
                      <button className="delete-btn">
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "Bookings") {
      return (
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>User Name</th>
                <th>Tickets Purchased</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <tr key={index}>
                    <td>{`0000${index + 1}`}</td>
                    <td>Charity Fundraiser</td>
                    <td>Jane Doe</td>
                    <td>{Math.floor(Math.random() * 10) + 1}</td>
                    <td>${(Math.random() * 500).toFixed(2)}</td>
                    <td>2024-11-20</td>
                    <td>
                      <button className="edit-btn">View Details</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="dashboard">
      <nav className="dasnavbar">
        <div className="logo">🌟 Mellodian Community Park</div>
        <button className="logout-button">
          <FiLogOut /> Logout
        </button>
      </nav>

      <div className="home-logo">
        <AiFillHome className="home-icon" />
        <a href="/" className="home-text">
          Home
        </a>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          Total Users
          <br />
          <span>1133</span>
          <div id="iconuser">
            <FaUsers />
          </div>
        </div>
        <div className="stat-card">
          Total Events
          <br />
          <span>73</span>
          <div id="iconuser">
            <MdOutlineEvent />
          </div>
        </div>
        <div className="stat-card">
          Total Bookings
          <br />
          <span>350</span>
          <div id="iconuser">
            <MdEventAvailable />
          </div>
        </div>
        <div className="stat-card">
          Revenue
          <br />
          <span>$10M</span>
          <div id="iconuser">
            <FaPrayingHands />
          </div>
        </div>
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
          <input className="search-bar" type="text" placeholder="Search here..." />
          <div id="search">
            <FiSearch />
          </div>
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
    </div>
  );
};

export default Dashboard;
