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

// FETCH MATCHES WITH TEAM DETAILS
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
    team2: { id: r.team2_id, name: r.team2_name, logo: r.team2_logo }
  }));
}

async function broadcastMatches() {
  io.emit("matches", await getMatches());
}

// ROUTES
app.get("/", (_, res) => res.send("Tournament Backend Running"));

app.get("/teams", async (_, res) => {
  const [rows] = await pool.query("SELECT * FROM teams ORDER BY name ASC");
  res.json(rows);
});

app.get("/matches", async (_, res) => {
  res.json(await getMatches());
});

app.post("/matches", async (req, res) => {
  const { match_no, team1_id, team2_id, match_type, score_summary, potm, is_live } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    if (is_live) {
      await conn.query("UPDATE matches SET is_live = 0");
    }

    await conn.query(
      `INSERT INTO matches (match_no, team1_id, team2_id, match_type, score_summary, potm, is_live)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [match_no, team1_id, team2_id, match_type, score_summary || "", potm || "", is_live ? 1 : 0]
    );

    await conn.commit();
    res.json({ success: true });
    broadcastMatches();
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: "Failed" });
  } finally {
    conn.release();
  }
});

app.put("/matches/:id", async (req, res) => {
  const id = req.params.id;
  const { match_no, match_type, score_summary, potm, is_live } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    if (is_live) {
      await conn.query("UPDATE matches SET is_live = 0 WHERE id != ?", [id]);
    }

    await conn.query(
      `UPDATE matches
       SET match_no=?, match_type=?, score_summary=?, potm=?, is_live=?
       WHERE id=?`,
      [match_no, match_type, score_summary || "", potm || "", is_live ? 1 : 0, id]
    );

    await conn.commit();
    res.json({ success: true });
    broadcastMatches();
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: "Failed" });
  } finally {
    conn.release();
  }
});

app.delete("/matches/:id", async (req, res) => {
  await pool.query("DELETE FROM matches WHERE id=?", [req.params.id]);
  res.json({ success: true });
  broadcastMatches();
});

// SOCKET
io.on("connection", async (socket) => {
  socket.emit("matches", await getMatches());
});

server.listen(process.env.PORT || 10000, () => {
  console.log("Backend running on port", process.env.PORT);
});
