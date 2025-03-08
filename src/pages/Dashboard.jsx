import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, onValue } from "../firebaseConfig";

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

          // Extract images from all locations for a team
          Object.values(data[teamName]).forEach((location) => {
            teamUploads = teamUploads.concat(Object.values(location));
          });

          // Extract valid timestamps
          const timestamps = teamUploads
            .map((img) => img.timestamp)
            .filter((timestamp) => timestamp);

          // Get the latest upload time (if available)
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-500">Admin Dashboard</h1>
        <h2 className="text-lg text-gray-400">Decked Out - TSEC Codetantra</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search Team..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-red-500 w-full max-w-lg text-white placeholder-gray-400 text-lg"
        />
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeams.map((team) => (
          <div
            key={team.teamNumber}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-700 hover:border-red-500 transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/team/${team.teamNumber}`)}
          >
            <h3 className="text-2xl font-semibold text-red-400">
              Team {team.teamNumber} - {team.teamName}
            </h3>
            <p className="text-gray-300 mt-3 text-lg">
              <span className="font-semibold">Submitted Images:</span> {team.submittedImages}/10
            </p>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold">Last Upload:</span> {team.lastUploadTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
