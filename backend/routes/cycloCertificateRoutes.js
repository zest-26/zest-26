import express from "express";
import { generateCycloCertificate } from "../controllers/cycloCertificateController.js";

const router = express.Router();

// POST /api/certificate/generate
router.post("/generateCycloCertificate", generateCycloCertificate);

export default router;
