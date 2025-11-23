require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const pool = require("./db");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// ---------- DB FETCH FUNCTION ----------
async function getMatches() {
  const [rows] = await pool.query(
    `SELECT m.*,
            t1.name AS team1_name, t1.logo AS team1_logo,
            t2.name AS team2_name, t2.logo AS team2_logo
     FROM matches m
     JOIN teams t1 ON m.team1_id = t1.id
     JOIN teams t2 ON m.team2_id = t2.id
     ORDER BY m.is_live DESC, m.match_no ASC, m.created_at ASC`
  );

  return rows.map((r) => ({
    id: r.id,
    match_no: r.match_no,
    match_type: r.match_type,
    score_summary: r.score_summary,
    potm: r.potm,
    is_live: !!r.is_live,
    team1: { id: r.team1_id, name: r.team1_name, logo: r.team1_logo },
    team2: { id: r.team2_id, name: r.team2_name, logo: r.team2_logo },
  }));
}

// ---------- SAFE SOCKET EMIT (prevents Render crashes) ----------
async function safeBroadcast(socket) {
  try {
    const matches = await getMatches();
    socket.emit("matches", matches);
  } catch (err) {
    console.log("⚠ DB not ready yet, retrying...");
  }
}

// ---------- ROUTES ----------
app.get("/", (_, res) => res.send("Tournament Backend Running"));

app.get("/teams", async (_, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM teams ORDER BY name ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.get("/matches", async (_, res) => {
  try {
    res.json(await getMatches());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// Add match
app.post("/matches", async (req, res) => {
  const { match_no, team1_id, team2_id, match_type, score_summary, potm, is_live } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    if (is_live) await conn.query("UPDATE matches SET is_live = 0");

    await conn.query(
      `INSERT INTO matches (match_no, team1_id, team2_id, match_type, score_summary, potm, is_live)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [match_no, team1_id, team2_id, match_type, score_summary || "", potm || "", is_live ? 1 : 0]
    );

    await conn.commit();
    res.json({ success: true });
    io.emit("matches", await getMatches());
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: "Failed to add match" });
  } finally {
    conn.release();
  }
});

// Update match
app.put("/matches/:id", async (req, res) => {
  const id = req.params.id;
  const { match_no, match_type, score_summary, potm, is_live } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    if (is_live) await conn.query("UPDATE matches SET is_live = 0 WHERE id != ?", [id]);

    await conn.query(
      `UPDATE matches
       SET match_no=?, match_type=?, score_summary=?, potm=?, is_live=?
       WHERE id=?`,
      [match_no, match_type, score_summary || "", potm || "", is_live ? 1 : 0, id]
    );

    await conn.commit();
    res.json({ success: true });
    io.emit("matches", await getMatches());
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: "Failed to update match" });
  } finally {
    conn.release();
  }
});

// Delete match
app.delete("/matches/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM matches WHERE id=?", [req.params.id]);
    res.json({ success: true });
    io.emit("matches", await getMatches());
  } catch {
    res.status(500).json({ error: "Failed to delete match" });
  }
});

// ---------- SOCKET CONNECTION (robust & retry safe) ----------
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // First emit attempt
  safeBroadcast(socket);

  // Emit every 3 seconds to guarantee sync
  const interval = setInterval(() => safeBroadcast(socket), 3000);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    clearInterval(interval);
  });
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log("Backend running on port", PORT));
