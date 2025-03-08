import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database, ref, onValue } from "../firebaseConfig";

const TeamDetails = () => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For image preview

  useEffect(() => {
    const fetchTeamData = () => {
      const teamRef = ref(database, `uploads`);
      onValue(teamRef, (snapshot) => {
        const data = snapshot.val() || {};
        const teamNames = Object.keys(data);
        const selectedTeamName = teamNames[teamNumber - 1];
        setTeamName(selectedTeamName);

        if (!selectedTeamName || !data[selectedTeamName]) {
          setTeamData([]);
          return;
        }

        const imagesArray = Object.entries(data[selectedTeamName]).flatMap(
          ([locationId, images]) =>
            Object.values(images).map((img) => ({
              locationId,
              timestamp: img.timestamp,
              url: img.url,
            }))
        );

        imagesArray.sort((a, b) => a.timestamp - b.timestamp);
        setTeamData(imagesArray);
      });
    };

    fetchTeamData();
  }, [teamNumber]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-red-500">
          {teamName ? `Team ${teamName}` : "Team Not Found"}
        </h1>
        <h2 className="text-lg text-gray-400">Uploaded Images</h2>
      </div>

      {/* No Uploads Case */}
      {teamData.length === 0 ? (
        <p className="text-center text-gray-400">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamData.map((submission, index) => (
            <div
              key={index}
              className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700 hover:border-red-500 transition duration-300 transform hover:scale-105 cursor-pointer flex flex-col"
              onClick={() => setSelectedImage(submission.url)} // Open image preview
            >
              {/* Location & Upload Time */}
              <div className="mb-3">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Location:</span>{" "}
                  {submission.locationId}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-200">Uploaded:</span>{" "}
                  {new Date(submission.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden rounded-md shadow-md">
                <img
                  src={submission.url}
                  alt="Submission"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative bg-gray-900 p-4 rounded-lg shadow-xl max-w-3xl w-full flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
            >
              ✕
            </button>

            {/* Image Display */}
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
            />

            {/* Download Button */}
            <a
              href={selectedImage}
              download
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
