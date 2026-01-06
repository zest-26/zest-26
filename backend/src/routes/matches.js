import express from 'express';
import { db } from '../config/firebase.js';
import { verifyToken, verifyCoordinator } from '../middleware/auth.js';

const router = express.Router();
const APP_ID = 'zest-live-ultimate';

// Get all matches (public)
router.get('/', async (req, res) => {
  try {
    const matchesRef = db.collection('artifacts').doc(APP_ID).collection('matches');
    const snapshot = await matchesRef.get();
    
    const matches = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Sort matches
    const statusOrder = { live: 0, break: 1, upcoming: 2, finished: 3 };
    matches.sort((a, b) => {
      const sa = statusOrder[(a.status || '').toLowerCase()] ?? 99;
      const sb = statusOrder[(b.status || '').toLowerCase()] ?? 99;
      if (sa !== sb) return sa - sb;
      return (b.createdAt?._seconds || 0) - (a.createdAt?._seconds || 0);
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Create match (coordinator only)
router.post('/', verifyToken, verifyCoordinator, async (req, res) => {
  try {
    const { sportId, teamA, teamB, playersA, playersB, status } = req.body;
    
    const matchRef = await db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('matches')
      .add({
        sportId: sportId || '',
        teamA: teamA.trim(),
        teamB: teamB.trim(),
        playersA: playersA?.trim() || '',
        playersB: playersB?.trim() || '',
        status: status || 'upcoming',
        scoreA: 0,
        scoreB: 0,
        detail: '00:00',
        commentary: [],
        createdAt: new Date(),
        lastUpdated: new Date(),
      });

    res.json({ id: matchRef.id, message: 'Match created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// Update match (coordinator only)
router.put('/:id', verifyToken, verifyCoordinator, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    await db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('matches')
      .doc(id)
      .update({
        ...updates,
        lastUpdated: new Date(),
      });

    res.json({ message: 'Match updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update match' });
  }
});

// Add commentary (coordinator only)
router.post('/:id/commentary', verifyToken, verifyCoordinator, async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    const newComment = {
      id: Date.now(),
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const matchRef = db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('matches')
      .doc(id);

    await matchRef.update({
      commentary: admin.firestore.FieldValue.arrayUnion(newComment),
      lastUpdated: new Date(),
    });

    res.json({ message: 'Commentary added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add commentary' });
  }
});

// Delete match (coordinator only)
router.delete('/:id', verifyToken, verifyCoordinator, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('matches')
      .doc(id)
      .delete();

    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete match' });
  }
});

export default router;