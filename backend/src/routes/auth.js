import express from 'express';
import { auth } from '../config/firebase.js';

const router = express.Router();

router.post('/anonymous', async (req, res) => {
  try {
    const customToken = await auth.createCustomToken('anonymous-user');
    res.json({ token: customToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create token' });
  }
});

router.post('/verify-pin', (req, res) => {
  const { pin } = req.body;
  
  if (pin === process.env.COORDINATOR_PIN) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid PIN' });
  }
});

export default router;