import express from "express";
import cors from "cors";
import cycloCertificateRoutes from "./routes/cycloCertificateRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cycloCertificate", cycloCertificateRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Backend Server Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
