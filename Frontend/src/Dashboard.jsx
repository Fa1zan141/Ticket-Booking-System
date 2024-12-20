import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaEdit, FaUsers, FaPrayingHands } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEvent, MdEventAvailable } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import './styles/Dashboard.css';
import EventPopup from "./components/EventPopup";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9; // Define rows per page for pagination

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "Users") fetchUsers();
    if (activeTab === "Events") fetchEvents();
    if (activeTab === "Bookings") fetchBookings();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setUserCount(response.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const bookingsResponse = await axios.get("http://localhost:3000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookings = bookingsResponse.data;

      const [usersResponse, eventsResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const users = usersResponse.data;
      const events = eventsResponse.data;

      const enhancedBookings = bookings.map((booking) => {
        const event = events.find((e) => e.id === booking.eventId) || {};
        const user = users.find((u) => u.id === booking.customerId) || {};

        return {
          ...booking,
          eventName: event.name || "Unknown Event",
          username: user.username || "Unknown User",
          eventDate: event.date?.split("T")[0] || "Unknown Date",
        };
      });

      setBookings(enhancedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleEditClick = (item) => {
    if (activeTab === "Users") {
      navigate(`/update-user/${item.id}`);
    } else if (activeTab === "Events") {
      navigate(`/update-event/${item.id}`);
    }
  };

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token");

    try {
      if (activeTab === "Users") {
        await axios.delete(`http://localhost:3000/api/users/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user.id !== itemId));
      } else if (activeTab === "Events") {
        await axios.delete(`http://localhost:3000/api/events/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(events.filter((event) => event.id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const paginateData = (items) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const renderContent = () => {
    const dataMap = { Users: users, Events: events, Bookings: bookings };
    const headersMap = {
      Users: ["#", "User Name", "Email", "Role", "Action"],
      Events: ["#", "Event Name", "Location", "Date", "Time", "Tickets Sold", "Action"],
      Bookings: ["#", "Event Name", "User Name", "Tickets Purchased", "Total Amount", "Date"],
    };

    const fieldsMap = {
      Users: ["username", "email", "role"],
      Events: ["name", "location", "date", "time", "ticketSold"],
      Bookings: ["eventName", "username", "ticketCount", "totalAmount", "eventDate"],
    };

    const items = paginateData(dataMap[activeTab]);
    const headers = headersMap[activeTab];
    const fields = fieldsMap[activeTab];

    return (
      <div className="table-content">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                {fields.map((field) => (
                  <td key={field}>{item[field]}</td>
                ))}
                {activeTab !== "Bookings" && (
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(item)}>
                      <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const totalPages = Math.ceil(
    (activeTab === "Users" ? users.length : activeTab === "Events" ? events.length : bookings.length) /
    rowsPerPage
  );

  return (
    <div className="dashboard">
      <nav className="dasnavbar">
        <div className="logo">🌟 Mellodian Community Park</div>
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </nav>
      <div className="home-logo">
        <AiFillHome className="home-icon" />
        <a href="/" className="home-text">Home</a>
      </div>
      <div className="stats-section">
        <div className="stat-card">
          Total Users<br />
          <span>{userCount}</span>
          <div id="iconuser"><FaUsers /></div>
        </div>
        <div className="stat-card">
          Total Events<br />
          <span>{events.length}</span>
          <div id="iconuser"><MdOutlineEvent /></div>
        </div>
        <div className="stat-card">
          Total Bookings<br />
          <span>{bookings.length}</span>
          <div id="iconuser"><MdEventAvailable /></div>
        </div>
        <div className="stat-card">
          Revenue<br />
          <span>$10M</span>
          <div id="iconuser"><FaPrayingHands /></div>
        </div>
      </div>
      <div className="tab-section">
        <div className="tabs">
          <button className={activeTab === "Users" ? "active" : ""} onClick={() => setActiveTab("Users")}>Users</button>
          <button className={activeTab === "Events" ? "active" : ""} onClick={() => setActiveTab("Events")}>Events</button>
          <button className={activeTab === "Bookings" ? "active" : ""} onClick={() => setActiveTab("Bookings")}>Bookings</button>
        </div>
        <div className="search-export">
          <button className="export-btn">Export List</button>
          <input className="search-bar" type="text" placeholder="Search here..." />
          <div id="addsearch"><FiSearch /></div>
          <button
            className="add-event-button"
            onClick={() => setIsPopupOpen(true)}
          >
            + Add New Event
          </button>
        </div>
        
        {renderContent()}
      </div>
      <EventPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <footer className="footer">
        <div className="footer-left">2024 © All Rights Reserved.</div>
        <div className="pagination">
          <span>Rows per page: {rowsPerPage} of {totalPages}</span>
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
