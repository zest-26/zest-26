import express from 'express';
import { admin,db,auth } from '../firebase.js';
import { verifyToken, verifyCoordinator } from '../middleware/auth.js';

const router = express.Router();
const APP_ID = 'zest-live-ultimate';

// Get all sports (public)
router.get('/', async (req, res) => {
  try {
    const sportsRef = db.collection('artifacts').doc(APP_ID).collection('sports');
    const snapshot = await sportsRef.get();
    
    const sports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sports' });
  }
});

// Create sport (coordinator only)
router.post('/', verifyToken, verifyCoordinator, async (req, res) => {
  try {
    const { name } = req.body;
    
    const sportRef = await db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('sports')
      .add({
        name: name.trim(),
        createdAt: new Date(),
      });

    res.json({ id: sportRef.id, message: 'Sport created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sport' });
  }
});

// Delete sport (coordinator only)
router.delete('/:id', verifyToken, verifyCoordinator, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db
      .collection('artifacts')
      .doc(APP_ID)
      .collection('sports')
      .doc(id)
      .delete();

    res.json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sport' });
  }
});

export default router;