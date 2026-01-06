import express from 'express';
import * as functions from 'firebase-functions';
import { auth, db } from '../firebase.js';  // make sure the path is correct

const router = express.Router();

// Route 1: Anonymous token
router.post('/anonymous', async (req, res) => {
  try {
    const customToken = await auth.createCustomToken('anonymous-user');
    res.json({ token: customToken });
  } catch (error) {
    console.error("Failed to create token:", error);
    res.status(500).json({ error: 'Failed to create token' });
  }
});

// Route 2: Verify PIN
router.post('/verify-pin', (req, res) => {
  const pin = req.body.pin;

  // Read coordinator PIN from Firebase Functions config
  const coordinatorPin = functions.config().app.coordinator_pin;

  if (!coordinatorPin) {
    return res.status(500).json({ error: "Coordinator PIN not set in Firebase config" });
  }

  if (pin === coordinatorPin) {
    return res.json({ valid: true });
  } else {
    return res.status(401).json({ valid: false, error: "Invalid PIN" });
  }
});

export default router;
