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

  const loadData = async () => {
    const t = await axios.get(`${API}/teams`);
    setTeams(t.data);

    const m = await axios.get(`${API}/matches`);
    setMatches(m.data);
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
    if (form.id) {
      await axios.put(`${API}/matches/${form.id}`, form);
    } else {
      await axios.post(`${API}/matches`, form);
    }

    setForm({
      id: null,
      match_no: "",
      team1_id: "",
      team2_id: "",
      match_type: "League",
      score_summary: "",
      potm: "",
      is_live: false,
    });
  };

  const edit = (m) => {
    setForm(m);
  };

  const remove = async (id) => {
    await axios.delete(`${API}/matches/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold text-center text-white">
        Admin Match Control
      </h1>

      {/* FORM */}
      <div className="max-w-3xl p-6 mx-auto mb-10 space-y-4 bg-gray-800 shadow-lg rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="match_no"
            placeholder="Match Number"
            value={form.match_no}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="match_type"
            value={form.match_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>League</option>
            <option>Semi Final</option>
            <option>Final</option>
          </select>

          <select
            name="team1_id"
            value={form.team1_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
          placeholder="Score Summary"
          value={form.score_summary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="potm"
          placeholder="Player of the Match"
          value={form.potm}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="is_live"
            checked={form.is_live}
            onChange={handleChange}
          />
          Set as LIVE (others will automatically stop live)
        </label>

        <button
          onClick={addOrUpdate}
          className="w-full p-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          {form.id ? "Update Match" : "Add Match"}
        </button>
      </div>

      {/* MATCH LIST */}
      <h2 className="mb-4 text-xl font-bold text-white">All Matches</h2>

      <div className="max-w-3xl mx-auto space-y-3">
        {matches.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between p-4 text-white bg-gray-800 shadow-md rounded-xl"
          >
            <span className="font-semibold">
              #{m.match_no} — {m.team1.name} vs {m.team2.name}{" "}
              {m.is_live && <span className="text-red-500">(LIVE)</span>}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => edit(m)}
                className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => remove(m.id)}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
