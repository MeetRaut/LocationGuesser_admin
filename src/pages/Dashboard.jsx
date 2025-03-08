import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, onValue } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTeams = () => {
      const teamsRef = ref(database, "uploads");
      onValue(teamsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const processedTeams = Object.keys(data).map((teamName, index) => {
          let teamUploads = [];

          Object.values(data[teamName]).forEach((location) => {
            teamUploads = teamUploads.concat(Object.values(location));
          });

          const timestamps = teamUploads
            .map((img) => img.timestamp)
            .filter((timestamp) => timestamp);

          const lastUploadTimestamp =
            timestamps.length > 0 ? Math.max(...timestamps) : null;

          return {
            teamNumber: index + 1,
            teamName,
            submittedImages: teamUploads.length,
            lastUploadTime: lastUploadTimestamp
              ? new Date(lastUploadTimestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })
              : "No uploads",
          };
        });

        setTeams(processedTeams);
      });
    };

    fetchTeams();
  }, []);

  // Filter teams based on search query
  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col">
      {/* Centered Title & Responsive Logout */}
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-red-500 tracking-wide text-center">
          Admin Dashboard
        </h1>
        <h2 className="text-lg text-gray-400 mt-1 text-center">
          Decked Out - TSEC Codetantra
        </h2>
      </div>

      {/* Responsive Logout Button */}
      <div className="flex justify-center mt-6 sm:absolute sm:top-6 sm:right-6">
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-5 py-2 rounded-md transition font-semibold shadow-lg w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-10 mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search Team..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-5 py-3 rounded-full bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-500 w-full max-w-lg text-white placeholder-gray-400 text-lg shadow-lg"
        />
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeams.map((team) => (
          <div
            key={team.teamNumber}
            className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-red-500 transition transform hover:scale-105 cursor-pointer backdrop-blur-sm"
            onClick={() => navigate(`/team/${team.teamNumber}`)}
          >
            <h3 className="text-2xl font-semibold text-red-400 mb-2">
              Team {team.teamNumber} - {team.teamName}
            </h3>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold">Submitted Images:</span>{" "}
              {team.submittedImages}/10
            </p>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold">Last Upload:</span>{" "}
              {team.lastUploadTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
