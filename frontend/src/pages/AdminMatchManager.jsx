import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../utils/socket";

const API = "YOUR_RENDER_BACKEND_URL";

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
    const m = await axios.get(`${API}/matches`);
    setTeams(t.data);
    setMatches(m.data);
  };

  useEffect(() => {
    loadData();
    socket.on("matches", (data) => setMatches(data));
    return () => socket.off("matches");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addOrUpdate = async () => {
    if (form.id) {
      await axios.put(`${API}/matches/${form.id}`, form);
    } else {
      await axios.post(`${API}/matches`, form);
    }
    setForm({
      id: null, match_no: "", team1_id: "", team2_id: "",
      match_type: "League", score_summary: "", potm: "", is_live: false
    });
  };

  const edit = (m) => setForm(m);
  const remove = async (id) => await axios.delete(`${API}/matches/${id}`);

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center">Admin Match Control</h1>

      {/* FORM */}
      <div className="max-w-xl p-4 mx-auto mb-6 bg-white shadow-md rounded-xl">
        <input type="number" name="match_no" placeholder="Match number" value={form.match_no} onChange={handleChange} />
        <select name="team1_id" value={form.team1_id} onChange={handleChange}>
          <option value="">Team 1</option>
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select name="team2_id" value={form.team2_id} onChange={handleChange}>
          <option value="">Team 2</option>
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select name="match_type" value={form.match_type} onChange={handleChange}>
          <option>League</option>
          <option>Semi Final</option>
          <option>Final</option>
        </select>
        <textarea name="score_summary" placeholder="Score summary" value={form.score_summary} onChange={handleChange} />
        <input name="potm" placeholder="Player of the Match" value={form.potm} onChange={handleChange} />
        <label>
          <input type="checkbox" name="is_live" checked={form.is_live} onChange={handleChange} /> Set LIVE
        </label>
        <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={addOrUpdate}>
          {form.id ? "Update Match" : "Add Match"}
        </button>
      </div>

      {/* MATCH LIST */}
      <h2 className="mb-3 text-xl">All Matches</h2>
      {matches.map((m) => (
        <div key={m.id} className="flex justify-between p-3 mb-2 bg-white rounded-md shadow-sm">
          <span>
            #{m.match_no} — {m.team1.name} vs {m.team2.name}
            {m.is_live && <b className="text-red-500"> (LIVE)</b>}
          </span>
          <div className="flex gap-2">
            <button onClick={() => edit(m)} className="px-2 py-1 text-white bg-gray-700 rounded">Edit</button>
            <button onClick={() => remove(m.id)} className="px-2 py-1 text-white bg-red-600 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
