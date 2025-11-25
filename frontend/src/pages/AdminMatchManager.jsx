import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../utils/socket";

const API = "https://zest-26.onrender.com";

export default function AdminMatchManager() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const [form, setForm] = useState({
    id: null,
    match_no: "",
    team1_id: "",
    team2_id: "",
    match_type: "League",
    score_summary: "",
    potm: "",
    is_live: false,
  });

  // load teams + matches + next match number
  const loadData = async () => {
    const [tRes, mRes, nextRes] = await Promise.all([
      axios.get(`${API}/teams`),
      axios.get(`${API}/matches`),
      axios.get(`${API}/next-match-no`),
    ]);
    setTeams(tRes.data);
    setMatches(mRes.data);
    setForm((prev) => ({ ...prev, match_no: nextRes.data.next }));
  };

  useEffect(() => {
    loadData();
    socket.on("matches", (data) => setMatches(data));
    return () => socket.off("matches");
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addOrUpdate = async () => {
    if (!form.team1_id || !form.team2_id || !form.match_no) return;
    if (form.team1_id === form.team2_id) {
      alert("Team 1 and Team 2 cannot be same");
      return;
    }

    if (form.id) {
      await axios.put(`${API}/matches/${form.id}`, form);
    } else {
      await axios.post(`${API}/matches`, form);
    }

    // get next match no
    const next = await axios.get(`${API}/next-match-no`);

    setForm({
      id: null,
      match_no: next.data.next,
      team1_id: "",
      team2_id: "",
      match_type: "League",
      score_summary: "",
      potm: "",
      is_live: false,
    });
  };

  const edit = (m) => {
    setForm({
      id: m.id,
      match_no: m.match_no,
      team1_id: m.team1.id,
      team2_id: m.team2.id,
      match_type: m.match_type,
      score_summary: m.score_summary || "",
      potm: m.potm || "",
      is_live: m.is_live,
    });
  };

  const remove = async (id) => {
    if (!confirm("Delete this match?")) return;
    await axios.delete(`${API}/matches/${id}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold text-white mb-8">
        Tournament Admin
      </h1>

      {/* FORM CARD */}
      <div className="bg-gray-800 max-w-3xl mx-auto rounded-2xl shadow-lg p-6 mb-10 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="match_no"
            placeholder="Match Number"
            value={form.match_no}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />

          <select
            name="match_type"
            value={form.match_type}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          >
            <option>League</option>
            <option>Semi Final</option>
            <option>Final</option>
          </select>

          <select
            name="team1_id"
            value={form.team1_id}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          >
            <option value="">Select Team 1</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            name="team2_id"
            value={form.team2_id}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          >
            <option value="">Select Team 2</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="score_summary"
          rows={3}
          placeholder="Score Summary (optional)"
          value={form.score_summary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="potm"
          placeholder="Player of the Match (optional)"
          value={form.potm}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="text-white flex items-center gap-2">
          <input
            type="checkbox"
            name="is_live"
            checked={form.is_live}
            onChange={handleChange}
          />
          Set as LIVE (only one live match at a time)
        </label>

        <button
          onClick={addOrUpdate}
          className="bg-blue-600 text-white w-full p-3 rounded-xl hover:bg-blue-700 font-semibold transition"
        >
          {form.id ? "Update Match" : "Add Match"}
        </button>
      </div>

      {/* MATCH LIST */}
      <h2 className="text-xl font-bold text-white mb-4 max-w-3xl mx-auto">
        All Matches
      </h2>

      <div className="space-y-3 max-w-3xl mx-auto">
        {matches.map((m) => (
          <div
            key={m.id}
            className="bg-gray-800 text-white p-4 rounded-xl flex justify-between items-center shadow-md"
          >
            <span className="font-semibold">
              #{m.match_no} — {m.team1.name} vs {m.team2.name}{" "}
              {m.is_live && <span className="text-red-500">(LIVE)</span>}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => edit(m)}
                className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => remove(m.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="text-center text-white/60">No matches yet</p>
        )}
      </div>
    </div>
  );
}
