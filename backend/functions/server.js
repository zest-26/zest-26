import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { admin, db, auth } from "./firebase.js";

import authRoutes from "./routes/auth.js";
import matchesRoutes from "./routes/matches.js";
import sportsRoutes from "./routes/sports.js";

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://coeptechzest.org",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Mount routes
app.use("/auth", authRoutes);
app.use("/matches", matchesRoutes);
app.use("/sports", sportsRoutes);

// Health & Root
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: "firebase",
    modules: "ES6",
  });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Test route works" });
});

app.get("/", (req, res) => {
  res.json({
    message: "ZEST Live Scores API",
    version: "1.0.0",
    platform: "Firebase Functions (Gen 1)",
    modules: "ES6",
  });
});

// 404 & Error Handling
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Export as Firebase Function with minInstances
/*
export const api = functions
  .runWith({
    timeoutSeconds: 300, // 5 minutes
    memory: "512MB",
    minInstances: 1, // keep function warm
  })
  .https.onRequest(app);
  
*/

  //deployment= comment this out and enable above code for blaze plan mininstances
  export const api = functions.https.onRequest(app);

// Keep-warm function pinging health endpoint
//deployment remove cooment from below if fastness is required, requires paid plan

/*
export const keepWarm = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async () => {
    const https = await import("https");
    const functionUrl =
      "https://us-central1-sports-live-hub.cloudfunctions.net/api/health";

    return new Promise((resolve) => {
      https.default
        .get(functionUrl, (res) => {
          console.log("Keep-warm ping status:", res.statusCode);
          resolve();
        })
        .on("error", (e) => {
          console.error("Keep-warm ping failed:", e.message);
          resolve();
        });
    });
  });
*/