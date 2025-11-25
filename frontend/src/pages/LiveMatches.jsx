import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    socket.on("matches", (data) => {
      setMatches(data); // no filtering → ALL matches
    });
    return () => socket.off("matches");
  }, []);

  const liveMatch = matches.find((m) => m.is_live);
  const upcoming = matches.filter((m) => !m.is_live && !m.score_summary);
  const completed = matches.filter((m) => m.score_summary);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <header className="border-b border-white/10 pb-4 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Zest 26 Tournament</h1>
            <p className="text-xs text-white/60">
              Live scores • Fixtures • Results
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
            Powered by zest-26
          </span>
        </header>

        {/* LIVE SECTION */}
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live match
          </h2>

          {liveMatch ? (
            <LiveCard match={liveMatch} />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 p-6 text-sm text-white/70 text-center">
              No match is live right now.
            </div>
          )}
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* UPCOMING */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Upcoming</h2>
            <MatchList matches={upcoming} emptyText="No upcoming fixtures." />
          </section>

          {/* COMPLETED */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Completed</h2>
            <MatchList
              matches={completed}
              emptyText="No completed matches yet."
              showResult
            />
          </section>
        </div>
      </div>
    </div>
  );
}

function LiveCard({ match }) {
  return (
    <div className="bg-gradient-to-r from-emerald-600/70 to-blue-600/70 rounded-2xl p-4 md:p-5 shadow-xl border border-white/10">
      <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-wide text-white/80">
        <span>Match {match.match_no}</span>
        <span>{match.match_type}</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <TeamBlock team={match.team1} />
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">
            LIVE
          </span>
          <span className="text-2xl font-bold">vs</span>
        </div>
        <TeamBlock team={match.team2} />
      </div>

      {match.score_summary && (
        <p className="mt-4 text-sm md:text-base">
          <span className="font-semibold">Score:</span>{" "}
          {match.score_summary}
        </p>
      )}

      {match.potm && (
        <p className="text-sm mt-1 text-white/90">
          <span className="font-semibold">POTM:</span> {match.potm}
        </p>
      )}
    </div>
  );
}

function TeamBlock({ team }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={team.logo}
        alt={team.name}
        className="w-10 h-10 rounded-full border border-white/40 object-cover bg-white"
      />
      <span className="font-semibold text-sm md:text-base">{team.name}</span>
    </div>
  );
}

function MatchList({ matches, emptyText, showResult = false }) {
  if (!matches.length) {
    return (
      <p className="text-sm text-white/60 border border-dashed border-white/15 rounded-xl p-4">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((m) => (
        <div
          key={m.id}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 flex flex-col gap-1 hover:bg-white/10 transition"
        >
          <div className="flex justify-between text-xs text-white/60">
            <span>Match {m.match_no}</span>
            <span>{m.match_type}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <span>{m.team1.name}</span>
            <span className="text-xs text-white/50">vs</span>
            <span>{m.team2.name}</span>
          </div>
          {m.score_summary && (
            <p className="text-xs text-white/80">
              <span className="font-semibold">Score:</span>{" "}
              {m.score_summary}
            </p>
          )}
          {showResult && m.potm && (
            <p className="text-xs text-emerald-300">POTM: {m.potm}</p>
          )}
        </div>
      ))}
    </div>
  );
}
