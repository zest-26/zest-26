import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    socket.on("matches", (data) => {
      setMatches(data);   // store ALL matches (not filtering)
    });
    return () => socket.off("matches");
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-center text-white">
        Tournament Matches
      </h1>

      {matches.length === 0 && (
        <p className="text-center text-white opacity-75">
          No matches added yet
        </p>
      )}

      {/* SHOW ALL MATCHES */}
      <div className="max-w-3xl mx-auto space-y-4">
        {matches.map((m) => (
          <div
            key={m.id}
            className="p-5 space-y-3 text-white bg-gray-800 shadow-lg rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                Match {m.match_no}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  m.is_live ? "bg-red-600 text-white" : "bg-gray-400"
                }`}
              >
                {m.is_live ? "LIVE" : m.match_type}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <img src={m.team1.logo} width="45" className="rounded-full" />
              <span className="text-lg font-semibold">{m.team1.name}</span>
              <span className="text-xl font-bold">vs</span>
              <span className="text-lg font-semibold">{m.team2.name}</span>
              <img src={m.team2.logo} width="45" className="rounded-full" />
            </div>

            {m.score_summary && (
              <p>
                <strong>Score:</strong> {m.score_summary}
              </p>
            )}

            {m.potm && (
              <p>
                <strong>POTM:</strong> {m.potm}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
