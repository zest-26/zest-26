import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    socket.on("matches", (data) => setMatches(data));
    return () => socket.off("matches");
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold text-center">Live Matches</h1>

      {matches.length === 0 && <p className="text-center">No live matches</p>}

      {matches.map((m) => (
        <div
          key={m.id}
          className="p-4 mb-4 bg-white shadow-md rounded-xl"
        >
          <div className="flex justify-between">
            <span className="text-lg font-bold">Match {m.match_no}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                m.is_live ? "bg-red-500 text-white" : "bg-gray-300"
              }`}
            >
              {m.is_live ? "LIVE" : m.match_type}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 py-2">
            <img src={m.team1.logo} width="50" />
            <span className="font-bold">{m.team1.name}</span>
            <span className="text-xl font-bold">vs</span>
            <span className="font-bold">{m.team2.name}</span>
            <img src={m.team2.logo} width="50" />
          </div>

          {m.score_summary && (
            <p className="mt-1"><b>Score:</b> {m.score_summary}</p>
          )}
          {m.potm && (
            <p><b>POTM:</b> {m.potm}</p>
          )}
        </div>
      ))}
    </div>
  );
}
